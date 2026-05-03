import { AttatchementController } from "../controllers/attatchement.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
 import {Router} from "express"
 const router =Router()
router.post("/orgs/:orgId/tasks/:taskId/attachments/presign-upload",authMiddleware,AttatchementController.presignUpload)
router.post("/orgs/:orgId/tasks/:taskId/attachments/confirm",authMiddleware,AttatchementController.confirmUpload)
router.get("/orgs/:orgId/tasks/:taskId/attachments/attatchements",authMiddleware,AttatchementController.list)
router.post("/orgs/:orgId/tasks/:taskId/attachments/presign-download",authMiddleware,AttatchementController.presigndownload)

export default router