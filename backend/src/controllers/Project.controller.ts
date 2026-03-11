import { Request, Response, NextFunction } from "express"
import { ProjectService } from "../services/project.services"

export class ProjectController {

  static async create(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user!.userId
      const { orgId } = req.params
      const { name } = req.body

      const project = await ProjectService.createProject(
        userId,
        orgId,
        name
      )

      return res.status(201).json(project)

    } catch (error) {
      next(error)
    }
  }

  static async list(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user!.userId
      const { orgId } = req.params
      const { page = "1", limit = "10" } = req.query

      const projects = await ProjectService.listProjects(
        userId,
        orgId,
        Number(page),
        Number(limit)
      )

      return res.json(projects)

    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user!.userId
      const { orgId, projectId } = req.params
      const { name } = req.body

      const project = await ProjectService.updateProject(
        userId,
        orgId,
        projectId,
        name
      )

      return res.json(project)

    } catch (error) {
      next(error)
    }
  }

  static async archive(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user!.userId
      const { orgId, projectId } = req.params

      await ProjectService.archiveProject(
        userId,
        orgId,
        projectId
      )

      return res.json({
        message: "Project archived successfully"
      })

    } catch (error) {
      next(error)
    }
  }

}