import { TokenPayload } from "./auth.type";
import jwt, { SignOptions } from "jsonwebtoken";

export function signToken(
  payload: TokenPayload,
  expiry?: SignOptions["expiresIn"],
): string {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiry || "7d",
  });
}

export function verifyToken(token: string): TokenPayload | null {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwt.decode(token) as TokenPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
