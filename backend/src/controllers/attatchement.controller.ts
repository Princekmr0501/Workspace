//controller of attatchement 
import  type {Request ,Response } from "express"
import { attatchementservice } from "../services/attatchement.services"
export class AttatchementController {
    //returning  prsign url with orgId ,taskId, and userId for uploading the data 
    static async presignUpload (req:Request,res:Response){
        const {orgId ,taskId}= req.params
        const  {filename ,mimeType }=req.body
        const userId =(req as any).user.userId // dont know how 
        const result = await attatchementservice.presignUpload(
            orgId ,
            taskId ,
            userId ,
            {filename,mimeType }
 )
        return res.json(result);

    }
//confirmin the upload using the userid check and  orgId and taskId 
    static async confirmUpload(req:Request,res:Response){
        const {orgId,taskId }=req.params;
        const userId =(req as any ).user.userId 
        const  result =await attatchementservice.confirmUpload(
            orgId,
            taskId,
            userId,
            req.body
        )
        return res.json(result)
    }

    //now asking for  the list of the attatchements
    static async list(req:Request,res:Response){
    const { taskId } =req.params;
    const result =await attatchementservice.listattatchement(taskId)
    
    return res.json(result)
}

// now getting the download link 
 static async presigndownload(req:Request,res:Response ){
    const { attatchemntID } =req.params;
    const result = await attatchementservice.presigndownload (attatchementId)
    return res.json(result)
 }
}