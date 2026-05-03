 //making plan controller
import  type {Request ,Response } from "express"

import PlanService from "../services/plan.services.ts"
 export default class Plancontroller{
    static async checkProPlan(req:Request ,res:Response){
    const {orgId}= req.params
    const result =await PlanService.checkProPlan(orgId);
   return res.json(result)
 }
}