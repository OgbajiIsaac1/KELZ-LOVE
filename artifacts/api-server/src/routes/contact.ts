import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, contactSubmissionsTable, insertContactSubmissionSchema } from "@workspace/db";
import { MarkContactReadParams } from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.post("/contact-submissions", async (req, res): Promise<void> => {
  const parsed = insertContactSubmissionSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [submission] = await db
    .insert(contactSubmissionsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(submission);
});

router.get("/contact-submissions", requireAdmin, async (req, res): Promise<void> => {
  const submissions = await db
    .select()
    .from(contactSubmissionsTable)
    .orderBy(desc(contactSubmissionsTable.createdAt));

  res.json(submissions);
});

router.patch("/contact-submissions/:id/read", requireAdmin, async (req, res): Promise<void> => {
  const parsed = MarkContactReadParams.safeParse(req.params);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [submission] = await db
    .update(contactSubmissionsTable)
    .set({ read: true })
    .where(eq(contactSubmissionsTable.id, parsed.data.id))
    .returning();

  if (!submission) {
    res.status(404).json({ error: "Submission not found" });
    return;
  }

  res.json(submission);
});

export default router;
