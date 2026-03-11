import {authMiddleware} from "../middlewares/auth.middleware"
import {TaskController} from "../controllers/tasks.controller"
import { Router }from "express"
const router = Router()
router.post("/orgs/:orgId/projects/:projectId/tasks",
    authMiddleware,TaskController.createTask
)
router.get("/orgs/:orgId/projects/:projectId/tasks",
    authMiddleware,TaskController.getTask
)
router.patch("/orgs/:orgId/projects/:projectId/tasks/:taskId",
    authMiddleware,TaskController.updateTask
)
router.delete("/orgs/:orgId/projects/:projectId/tasks/:taskId",
    authMiddleware,TaskController.deleteTask
)
export default router