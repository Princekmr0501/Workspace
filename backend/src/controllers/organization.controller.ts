// controllers/organization.controller.ts

import { Request, Response } from "express"
import { OrganizationService } from "../services/organization.services"
import { AuthenticatedRequest, User } from "../types/express"
import { UnauthorizedError } from "../errors/notfound.error"
import { MembershipRepository } from "../Repositories/membership.repository"


// controller should only deal with business logic
// no technical implementation
export class OrganizationController {

  static async create(name: string, user?: User) {
    if (!user?.userId) {
      throw new UnauthorizedError("Unauthorized")
    }
    const userId = user.userId   // from auth middleware
    
    const organization = await OrganizationService.createOrganization(
      userId,
      name
    )

    // Create Admin membership
    await MembershipRepository.create({
      userId,
      organizationId: organization.id,
      role: "Admin"
    })
    
    return organization
  }
}