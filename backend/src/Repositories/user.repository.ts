import {prisma} from "../config/prisma.ts"
export  class Userrepository {
   static async create (data:{
    name :string 
    email:string 
    password :string 

  })
  {return prisma.user.create({
    data
  })
  }

 static async findByEmail(email:string){
    return prisma.user.findUnique({
    where:{email}
    })
  }

  async findById(id:number){
    return prisma.user.findUnique({
    where:{id}
    })

}
}
