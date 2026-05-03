import { Router } from "express"
import { ProjectController } from "../controllers/Project.controller"
import { authMiddleware } from "../middlewares/auth.middleware"
import authorization   from "../middlewares/authorization.middleware.ts"

const router = Router()

router.post(
  "/orgs/:orgId/projects",
  authMiddleware,authorization("admin"),
  ProjectController.create
)

router.get(
  "/orgs/:orgId/projects",
  authMiddleware,authorization("admin"),
  ProjectController.list
)

router.patch(
  "/orgs/:orgId/projects/:projectId",
  authMiddleware,authorization("admin"),
  ProjectController.update
)

router.post(
  "/orgs/:orgId/projects/:projectId/archive",
  authMiddleware,authorization("admin"),
  ProjectController.archive
)

export default router