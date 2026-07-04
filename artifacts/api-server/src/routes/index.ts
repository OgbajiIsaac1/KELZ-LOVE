import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogRouter from "./blog";
import newsletterRouter from "./newsletter";
import siteContentRouter from "./siteContent";
import adminRouter from "./admin";
import contactRouter from "./contact";
import sitemapRouter from "./sitemap";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);
router.use(newsletterRouter);
router.use(siteContentRouter);
router.use(adminRouter);
router.use(contactRouter);
router.use(sitemapRouter);

export default router;
