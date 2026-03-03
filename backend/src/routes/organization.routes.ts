// routes/organization.routes.ts

import { Router } from "express"
import { OrganizationController } from "../controllers/organization.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

router.post("/orgs", authMiddleware, OrganizationController.create)

export default router