"use server";

import { signToken, verifyToken } from "./auth.service";
import { AUTH_COOKIE_NAME, COOKIE_OPTIONS } from "@/constants";
import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
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
    await connectDB();
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const newUser = await UserModel.create({
      email,
      password,
      name,
    });
    const token = signToken({
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
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
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
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
    throw new Error("Login failed");
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
