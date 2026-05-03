import { Request, Response, NextFunction } from "express";

export const ADMIN_COOKIE = "melvina_admin_session";
export const ADMIN_TOKEN = "authenticated";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const cookie = req.cookies?.[ADMIN_COOKIE];
  if (cookie !== ADMIN_TOKEN) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
