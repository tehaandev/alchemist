export const AUTH_COOKIE_NAME = "auth_token";

export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 90, // 90 days
};

export const MAX_FILE_SIZE = 20 * 1024 * 1024; // 5MB
