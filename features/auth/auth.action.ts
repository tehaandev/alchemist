"use server";

import { signToken, verifyToken } from "./auth.service";
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS } from "@/constants";
import { prisma } from "@/lib/prisma";
import { loginRateLimiter } from "@/lib/rate-limiter";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function registerAction({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    // const existingUser = await UserModel.findOne({ email });
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    const token = signToken({
      id: newUser.id,
      email: newUser.email,
    });
    const c = await cookies();
    c.set({ name: AUTH_COOKIE_NAME, value: token, ...COOKIE_OPTIONS });
    return { message: "Registration successful" };
  } catch (error: unknown) {
    console.error("Error in registerAction:", error);
    throw new Error("Registration failed");
  }
}

export async function loginAction({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const c = await cookies();

  // Get client IP for rate limiting
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown-ip";

  // Check if the IP is already rate limited
  if (loginRateLimiter.isRateLimited(ip)) {
    const timeRemaining = Math.ceil(
      loginRateLimiter.getTimeRemaining(ip) / 1000 / 60,
    );
    throw new Error(
      `Too many login attempts. Please try again in ${timeRemaining} minutes.`,
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Record failed attempt
      loginRateLimiter.increment(ip);
      const remainingAttempts = loginRateLimiter.getRemainingAttempts(ip);

      throw new Error(
        remainingAttempts > 0
          ? `Invalid email or password. ${remainingAttempts} attempts remaining.`
          : "Too many failed login attempts. Please try again later.",
      );
    }

    // Success! Reset rate limiter for this IP
    loginRateLimiter.reset(ip);

    const token = signToken({
      id: user.id,
      email: user.email,
    });
    c.set({ name: AUTH_COOKIE_NAME, value: token, ...COOKIE_OPTIONS });
    return { message: "Login successful" };
  } catch (error: unknown) {
    c.delete(AUTH_COOKIE_NAME);
    if (error instanceof Error) {
      console.error("Error in loginAction:", error.message);
    } else {
      console.error("Error in loginAction:", error);
    }
    throw error; // Re-throw the original error with attempt information
  }
}

export async function logoutAction() {
  const c = await cookies();
  c.delete(AUTH_COOKIE_NAME);
  redirect("/login", RedirectType.replace);
}

export async function getUserFromCookieAction() {
  const c = await cookies();
  const token = c.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    return verifyToken(token);
  } catch {
    c.delete(AUTH_COOKIE_NAME);
    return null;
  }
}

export async function getUser() {
  try {
    const tokenUser = await getUserFromCookieAction();
    if (!tokenUser) {
      throw new Error("Unauthorized");
    }
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: tokenUser.id },
    });
    return user;
  } catch (error) {
    console.error("Error in getUser:", error);
    throw new Error("Failed to fetch user");
  }
}
