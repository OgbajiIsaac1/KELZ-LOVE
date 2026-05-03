import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";
import {
  ListBlogPostsQueryParams,
  CreateBlogPostBody,
  GetBlogPostParams,
  UpdateBlogPostParams,
  UpdateBlogPostBody,
  DeleteBlogPostParams,
} from "@workspace/api-zod";
import { requireAdmin } from "../middlewares/adminAuth";

const router: IRouter = Router();

router.get("/blog-posts", async (req, res): Promise<void> => {
  const query = ListBlogPostsQueryParams.safeParse(req.query);
  const showAll = query.success && query.data.all === "true";
  const isAdmin = req.cookies?.melvina_admin_session === "authenticated";

  let posts;
  if (showAll && isAdmin) {
    posts = await db.select().from(blogPostsTable).orderBy(desc(blogPostsTable.createdAt));
  } else {
    posts = await db
      .select()
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true))
      .orderBy(desc(blogPostsTable.publishedAt));
  }

  res.json(posts);
});

router.post("/blog-posts", requireAdmin, async (req, res): Promise<void> => {
  const parsed = CreateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const publishedAt = data.published ? new Date() : null;

  const [post] = await db
    .insert(blogPostsTable)
    .values({ ...data, publishedAt })
    .returning();

  res.status(201).json(post);
});

router.get("/blog-posts/:id", async (req, res): Promise<void> => {
  const params = GetBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [post] = await db
    .select()
    .from(blogPostsTable)
    .where(eq(blogPostsTable.id, params.data.id));

  if (!post) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.json(post);
});

router.patch("/blog-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = UpdateBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateBlogPostBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const data = parsed.data;
  const [existing] = await db.select().from(blogPostsTable).where(eq(blogPostsTable.id, params.data.id));
  if (!existing) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  const publishedAt = data.published && !existing.publishedAt ? new Date() : existing.publishedAt;

  const [post] = await db
    .update(blogPostsTable)
    .set({ ...data, publishedAt })
    .where(eq(blogPostsTable.id, params.data.id))
    .returning();

  res.json(post);
});

router.delete("/blog-posts/:id", requireAdmin, async (req, res): Promise<void> => {
  const params = DeleteBlogPostParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [deleted] = await db
    .delete(blogPostsTable)
    .where(eq(blogPostsTable.id, params.data.id))
    .returning();

  if (!deleted) {
    res.status(404).json({ error: "Post not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;
