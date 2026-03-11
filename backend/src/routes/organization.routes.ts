// routes/organization.routes.ts

import { Router } from "express"
import { OrganizationController } from "../controllers/organization.controller"
import { authMiddleware } from "../middlewares/auth.middleware"

const router = Router()

// router.post("/orgs", authMiddleware, OrganizationController.create)

// router should only deal with technical api calls stuff
// like parsing request, calling controller and sending response 
router.post("/orgs", authMiddleware, async (req, res, next) => {
    try {
        const {
            user,
            body
        } = req

        const response = await OrganizationController.create(body.name, user)

        return response
    } catch (error) {
      next(error)
    }
})

export default router