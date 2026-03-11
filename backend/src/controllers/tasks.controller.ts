import { Request, Response, NextFunction } from "express"
import { BadRequestError } from "../errors/bad-request.error"
import { TaskService } from "../services/tasks.services"

// creating Task
export class TaskController {

  static async createTask(req: Request, res: Response, next: NextFunction) {
    try {

      const userId = req.user?.userId

      if (!userId) {
  throw new Error("User not found")
}


      const { projectName } = req.body

      if (!projectName) {
        throw new BadRequestError("Project name is required")
      }

      const task = await TaskService.createTask(userId, projectName)

      res.status(201).json(task)

    } catch (error) {
      next(error)
    }
  }


  // get task
  static async getTask(req: Request, res: Response, next: NextFunction) { // FIXED: method wrapper added
    try {

      const getTask = await TaskService.getTask() // FIXED: gettask → getTask

      if (!getTask) {
        throw new BadRequestError("Task is null")
      }

      res.status(200).json(getTask) // FIXED: 201 → 200 (GET request)

    } catch (error) {
      next(error)
    }
  }


  // update task
  static async updateTask(req: Request, res: Response, next: NextFunction) { // FIXED: method wrapper added
    try {

      const userId = req.user?.userId // FIXED: userId missing
      const { projectName } = req.body // FIXED: variable missing

      if (!userId) {
  throw new Error("User not found")
}


      const updateTask = await TaskService.updateTask(userId, projectName) // FIXED: updatetask → updateTask

      if (!updateTask) {
        throw new BadRequestError("Task not updated")
      }

      res.status(200).json(updateTask) // FIXED: response variable

    } catch (error) {
      next(error)
    }
  }


  // delete task
  static async deleteTask(req: Request, res: Response, next: NextFunction) { // FIXED: method wrapper added
    try {

      const userId = req.user?.userId // FIXED: userId missing
      const { projectName } = req.body // FIXED: variable missing

      if (!userId) {
  throw new Error("User not found")
}


      const deleteTask = await TaskService.deleteTask(userId, projectName)

      if (!deleteTask) { // FIXED: deleteTaskk → deleteTask
        throw new BadRequestError("Task not deleted")
      }

      res.status(200).json(deleteTask) // FIXED: eleteTask → deleteTask

    } catch (error) {
      next(error)
    }
  }

}