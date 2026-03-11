// repositories/membership.repository.ts
import {prisma} from "../config/prisma.ts"

export class MembershipRepository {

  static async create(data: {
    userId: string
    organizationId: string
    role: "Admin" | "Member"
  }) {
    return prisma.membership.create({
      data
    })
  }

  static async findMembership(userId: string, orgId: string) {
    return prisma.membership.findUnique({
      where: {
        userId_organizationId: {
          userId: userId,
          organizationId: orgId
        }
      }
    })
  }

}