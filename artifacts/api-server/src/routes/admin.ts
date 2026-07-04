import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import {
  ADMIN_COOKIE,
  authenticate,
  issueSessionToken,
  validateSession,
  getAdminCookieOptions,
} from "../middlewares/adminAuth";

const router: IRouter = Router();

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (!authenticate(parsed.data.password)) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  const token = issueSessionToken();
  res.cookie(ADMIN_COOKIE, token, getAdminCookieOptions());

  res.json({ authenticated: true });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  res.clearCookie(ADMIN_COOKIE, { path: "/" });
  res.json({ authenticated: false });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  const cookie = req.cookies?.[ADMIN_COOKIE];
  const authenticated = validateSession(cookie);
  res.json({ authenticated });
});

export default router;
