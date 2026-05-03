import { Router, type IRouter } from "express";
import { AdminLoginBody } from "@workspace/api-zod";
import { ADMIN_COOKIE, ADMIN_TOKEN } from "../middlewares/adminAuth";

const router: IRouter = Router();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "melvina2026";

router.post("/admin/login", async (req, res): Promise<void> => {
  const parsed = AdminLoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  if (parsed.data.password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: "Invalid password" });
    return;
  }

  res.cookie(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ authenticated: true });
});

router.post("/admin/logout", async (req, res): Promise<void> => {
  res.clearCookie(ADMIN_COOKIE);
  res.json({ authenticated: false });
});

router.get("/admin/me", async (req, res): Promise<void> => {
  const cookie = req.cookies?.[ADMIN_COOKIE];
  const authenticated = cookie === ADMIN_TOKEN;
  res.json({ authenticated });
});

export default router;
