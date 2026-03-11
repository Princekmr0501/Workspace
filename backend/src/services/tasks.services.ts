import { TaskRepository } from "../Repositories/tasks.repositories"
import { BadRequestError } from "../errors/bad-request.error"

export class TaskService {

  static async createTask(userId: string, projectName: string) {

    if (!userId) {
      throw new BadRequestError("User not authenticated")
    }

    const task = await TaskRepository.createTask({
      userId,
      projectName
    })

    return task
  }


  static async getTask() {

    const tasks = await TaskRepository.getAll()

    return tasks
  }


  static async updateTask(userId: string, projectName: string) {

    if (!userId) {
      throw new BadRequestError("User not authenticated")
    }

    const task = await TaskRepository.updateTask({
      userId,
      projectName
    })

    return task
  }


  static async deleteTask(userId: string, projectName: string) {

    if (!userId) {
      throw new BadRequestError("User not authenticated")
    }

    const task = await TaskRepository.delete({
      userId,
      projectName
    })

    return task
  }

}