
import { MembershipRepository } from "../Repositories/membership.repository"
import { ForbiddenError } from "../errors/forbidden.error.ts"
import { NotFoundError } from "../errors/notfound.error.ts"
import { ProjectRepository } from "../Repositories/project.repository.ts"
import { ROLE } from "../constants/role.ts"

export class ProjectService {

  static async createProject(
    userId: string,
    orgId: string,
    name: string
  ) {

    const membership =
      await MembershipRepository.findMembership(userId, orgId)

    if (!membership) {
      throw new NotFoundError("Membership not found")
    }

    if (membership.role !== ROLE.ADMIN) {
      throw new ForbiddenError("Only admin can create projects")
    }

    return ProjectRepository.create(orgId, name)
  }

  static async listProjects(
    userId: string,
    orgId: string,
    page: number,
    limit: number
  ) {

    const membership =
      await MembershipRepository.findMembership(userId, orgId)

    if (!membership) {
      throw new NotFoundError("Membership not found")
    }

    return ProjectRepository.findMany(orgId, page, limit)
  }

  static async updateProject(
    userId: string,
    orgId: string,
    projectId: string,
    name: string
  ) {

    const membership =
      await MembershipRepository.findMembership(userId, orgId)

    if (!membership || membership.role !== ROLE.ADMIN) {
      throw new ForbiddenError("Only admin can update project")
    }

    return ProjectRepository.update(projectId, name)
  }

  static async archiveProject(
    userId: string,
    orgId: string,
    projectId: string
  ) {

    const membership =
      await MembershipRepository.findMembership(userId, orgId)

    if (!membership || membership.role !== ROLE.ADMIN) {
      throw new ForbiddenError("Only admin can archive project")
    }

    await ProjectRepository.archive(projectId)

  }
}