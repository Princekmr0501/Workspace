import {Request ,Response,NextFunction} from "express"
import { ForbiddenError } from "../errors/forbidden.error.ts"
const authorization = (role_to_cneck:string) =>{
  return (req:Request,res:Response,next:NextFunction) =>{
    const userRole = req.user?.role
    if (userRole!=role_to_cneck){
      throw new ForbiddenError("Only admin can create projects")
    }
    next()
}
}

export default authorization;