// services/organization.service.ts

import { OrganizationRepository } from "../Repositories/organization.repository.ts"
import { MembershipRepository } from "../Repositories/membership.repository"
import { ConflictError } from "../errors/conflict.error"
import { BadRequestError } from "../errors/bad-request.error.ts"

// services should only deal with technical implementation
// like db calls, external api calls, etc
// no business rules
export class OrganizationService {

  static async createOrganization(userId: string, name: string) {

    if (!name || name.trim().length === 0) {
      throw new BadRequestError("Organization name is required")
    }

    //  Check if name already exists
    const existingOrg = await OrganizationRepository.findByName(name)

    if (existingOrg) {
      throw new ConflictError("Organization name already taken")
    }

    // Create organization
    const organization = await OrganizationRepository.create({
      name,
      plan: "Free"
    })

    return organization
  }

}