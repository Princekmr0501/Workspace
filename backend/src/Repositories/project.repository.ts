import { prisma } from "../config/prisma.ts"

export class ProjectRepository {

  static async create(orgId: string, name: string) {
    return prisma.project.create({
      data: {
        name,
        organizationId: orgId
      }
    })
  }

  static async findMany(
    orgId: string,
    page: number,
    limit: number
  ) {

    const skip = (page - 1) * limit

    return prisma.project.findMany({
      where: {
        organizationId: orgId,
        archivedAt: null
      },
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc"
      }
    })
  }

  static async update(
    projectId: string,
    name: string
  ) {

    return prisma.project.update({
      where: { id: projectId },
      data: { name }
    })

  }

  static async archive(projectId: string) {

    return prisma.project.update({
      where: { id: projectId },
      data: {
        archivedAt: new Date()
      }
    })

  }

}