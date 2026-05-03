import { Router } from "express"
import Plancontroller  from "../controllers/plan.controller";
const router = Router();
router.get("/orgs/:orgId/checkProPlan",Plancontroller.checkProPlan)
export default  router;