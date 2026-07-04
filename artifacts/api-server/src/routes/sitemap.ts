import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, blogPostsTable } from "@workspace/db";

const router: IRouter = Router();

const SITE_URL = "https://melvinaigboanugo.com";

const staticPages = [
  { loc: "/", priority: "1.0", changefreq: "weekly" },
  { loc: "/about", priority: "0.8", changefreq: "monthly" },
  { loc: "/programs", priority: "0.9", changefreq: "monthly" },
  { loc: "/impact", priority: "0.7", changefreq: "monthly" },
  { loc: "/contact", priority: "0.6", changefreq: "monthly" },
  { loc: "/blog", priority: "0.8", changefreq: "weekly" },
];

router.get("/sitemap.xml", async (_req, res) => {
  try {
    const posts = await db
      .select({ id: blogPostsTable.id, updatedAt: blogPostsTable.updatedAt })
      .from(blogPostsTable)
      .where(eq(blogPostsTable.published, true))
      .orderBy(blogPostsTable.publishedAt);

    const urls = [...staticPages];

    for (const post of posts) {
      urls.push({
        loc: `/blog/${post.id}`,
        priority: "0.6",
        changefreq: "monthly",
      });
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${SITE_URL}${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.send(xml);
  } catch {
    res.status(500).send("Error generating sitemap");
  }
});

export default router;
