// repositories/organization.repository.ts

import { prisma } from "../config/prisma.ts"

export class OrganizationRepository {

  static async findByName(name: string) {
    return prisma.organization.findUnique({
      where: { name }
    })
  }

  static async create(data: {
    name: string
    plan?: "Free" | "Pro"
  }) {
    return prisma.organization.create({
      data
    })
  }

}