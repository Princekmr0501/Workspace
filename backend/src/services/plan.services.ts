import { NotFoundError } from "../errors/notfound.error"
import { ForbiddenError } from "../errors/forbidden.error";
import { OrgRepository }  from "../Repositories/plan.repository.ts"
export class PlanService{
    static async checkProPlan(orgId:string){
        const org =await OrgRepository.findById(orgId)

        if(!org){
            throw new NotFoundError ("Organization doesnt exist ")
        }
        if(org.plan==="Free"){
            throw new ForbiddenError ("upgrade to PRO to use thid feature ")
        }
        return true;
    }
}
export default PlanService 