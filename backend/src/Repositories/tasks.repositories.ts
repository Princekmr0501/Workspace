
import {prisma} from "../config/prisma.ts"
export class TaskRepository {
   static async createTask(data: { userId: string; projectName: string }) {
  return prisma.task.create({
    data: {
      createdBy: data.userId,
      projectId: data.projectName
    }
  })
}
    static async getAll() {

    return prisma.task.findMany()
  }

    static async updateTask(data :{userId:string,projectName:string}){
        return prisma.task.updateMany({
        where :{
        createdBy :data.userId 
        },
        data:{
            projectId:data.projectName
        }
    })
    }
     
    static async delete(data: { userId: string; projectName: string }) {

    return prisma.task.deleteMany({
      where: {
        createdBy: data.userId
      }
    })
  }
    }
