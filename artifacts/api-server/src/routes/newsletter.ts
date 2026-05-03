import { Router, type IRouter } from "express";
import { db, newsletterSubscribersTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { SubscribeNewsletterBody } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.post("/newsletter/subscribe", async (req, res): Promise<void> => {
  const parsed = SubscribeNewsletterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  try {
    const [subscriber] = await db
      .insert(newsletterSubscribersTable)
      .values(parsed.data)
      .returning();
    res.status(201).json(subscriber);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("unique")) {
      res.status(409).json({ error: "Already subscribed" });
      return;
    }
    throw err;
  }
});

router.get("/newsletter/subscribers", requireAdmin, async (req, res): Promise<void> => {
  const subscribers = await db
    .select()
    .from(newsletterSubscribersTable)
    .orderBy(desc(newsletterSubscribersTable.createdAt));

  res.json(subscribers);
});

export default router;
