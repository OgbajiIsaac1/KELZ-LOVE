import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, siteContentTable } from "@workspace/db";
import {
  UpdateSiteContentParams,
  UpdateSiteContentBody,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/site-content", async (req, res): Promise<void> => {
  const content = await db.select().from(siteContentTable);
  res.json(content);
});

router.patch("/site-content/:key", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateSiteContentParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateSiteContentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db
    .select()
    .from(siteContentTable)
    .where(eq(siteContentTable.key, params.data.key));

  let result;
  if (existing.length > 0) {
    [result] = await db
      .update(siteContentTable)
      .set({ value: parsed.data.value })
      .where(eq(siteContentTable.key, params.data.key))
      .returning();
  } else {
    [result] = await db
      .insert(siteContentTable)
      .values({ key: params.data.key, value: parsed.data.value })
      .returning();
  }

  res.json(result);
});

export default router;
