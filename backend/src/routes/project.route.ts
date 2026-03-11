import { Router } from "express"
import { ProjectController } from "../controllers/Project.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post(
  "/orgs/:orgId/projects",
  authMiddleware,
  ProjectController.create
)

router.get(
  "/orgs/:orgId/projects",
  authMiddleware,
  ProjectController.list
)

router.patch(
  "/orgs/:orgId/projects/:projectId",
  authMiddleware,
  ProjectController.update
)

router.post(
  "/orgs/:orgId/projects/:projectId/archive",
  authMiddleware,
  ProjectController.archive
)

export default router