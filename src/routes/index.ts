import { Router } from "express";
import routerFiles from "./files/files.route";
import routerRecords from "./records/records.route";
import routerLogin from "./auth/auth.route";

const router = Router();

router.use("/auth", routerLogin);
router.use("/files", routerFiles);
router.use("/records", routerRecords);

export default router;
