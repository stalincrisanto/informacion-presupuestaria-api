import { Router } from "express";
import routerFiles from "./files/files.route";

const router = Router();

router.use("/files", routerFiles);

export default router;