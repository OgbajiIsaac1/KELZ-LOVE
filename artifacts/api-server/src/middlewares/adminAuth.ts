import { randomBytes, timingSafeEqual } from "node:crypto";
import type { Request, Response, NextFunction } from "express";

export const ADMIN_COOKIE = "melvina_admin_session";

const TOKEN_BYTES = 32;

function generateToken(): string {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

function getAdminPassword(): string {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw || pw.length < 8) {
    throw new Error(
      "ADMIN_PASSWORD environment variable must be set to at least 8 characters",
    );
  }
  return pw;
}

function getAdminToken(): string {
  if (!process.env.ADMIN_SESSION_TOKEN) {
    process.env.ADMIN_SESSION_TOKEN = generateToken();
  }
  return process.env.ADMIN_SESSION_TOKEN;
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  };
}

export function authenticate(password: string): boolean {
  const expected = getAdminPassword();
  if (password.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(password), Buffer.from(expected));
}

export function issueSessionToken(): string {
  return getAdminToken();
}

export function validateSession(cookieValue: string | undefined): boolean {
  if (!cookieValue || cookieValue.length !== TOKEN_BYTES * 2) return false;
  const expected = getAdminToken();
  if (cookieValue.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(cookieValue), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const cookie = req.cookies?.[ADMIN_COOKIE];
  if (!validateSession(cookie)) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
