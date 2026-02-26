
import { Authservice } from "../services/auth.login.services.ts"
const authservice = new Authservice()
export class Authcontroller {
    static async register (req:any,res:any)
    {
        const {name ,email,password}=req.body
        const result =await authservice.register(name,email,password)
        res.status(201).json(result)
    }

    static async login(req:any,res:any){
        const {name ,email,password}=req.body
        const result =await Authservice.login(email,password )
        res.status(200).josn(result)
    }
}