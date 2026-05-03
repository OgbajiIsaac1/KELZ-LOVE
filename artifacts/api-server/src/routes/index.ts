import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogRouter from "./blog";
import newsletterRouter from "./newsletter";
import siteContentRouter from "./siteContent";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogRouter);
router.use(newsletterRouter);
router.use(siteContentRouter);
router.use(adminRouter);

export default router;
