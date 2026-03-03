// controllers/organization.controller.ts

import { Request, Response } from "express"
import { OrganizationService } from "../services/organization.services"


export class OrganizationController {

  static async create(req: Request, res: Response) {

    try {
      const userId = req.user?.userId   // from auth middleware
      const name = req.body.name

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" })
      }

      const organization = await OrganizationService.createOrganization(
        userId,
        name
      )

      return res.status(201).json(organization)

    } catch (error: any) {

      return res.status(error.statusCode || 500).json({
        message: error.message || "Something went wrong"
      })
    }
  }

}