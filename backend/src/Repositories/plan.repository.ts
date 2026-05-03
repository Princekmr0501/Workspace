
import { prisma } from "../config/prisma.ts"
export  class OrgRepository{
    static async findById(orgId :string ){
        return prisma.plan_gating.findUnique({
           where :{
            id:orgId
           },
        })
        }
    }
    
