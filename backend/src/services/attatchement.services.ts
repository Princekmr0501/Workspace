import {s3 } from "../config/s3";
//import {PutObjectCommand ,GetObjectCommand} from "@aws.sdk/client-s3"
import { S3Client, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
 import PlanService from "./plan.services.ts"
import { prisma } from "../config/prisma.ts"
 import {NotFoundError} from "../errors/notfound.error.ts"
 const BUCKET = process.env.AWS_BUCKET!;
export class attatchementservice {
    
    static async presignUpload(
        userId: string,
        orgId: string,
        taskId: string,
        file: { filename: string; mimeType: string }
    ) {
        //checking the plan if its a pro 
        await PlanService.checkProPlan(orgId);
        //now creating the instructions to store the data 
        const key = 'orgs/${orgId}/tasks/{taskId}/${Date.now()}-${file.filename}';
        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            ContentType: file.mimeType
        });
        const url = await getSignedUrl(s3, command, { expiresIn: 60 });

        return { url, key };
    }

//generate presigned url 

//confirm and send the metadata to the database 
static async confirmUpload(
    userId : string ,
    orgId  : string ,
    taskId : string ,
    data :{
      key:string;
      filename :string;
      size :number;
      mimeType:string;
    }
){
    return prisma.attachment.create({
        data:{
            taskId,
            organizationId :orgId ,
            uploadedByUserId:userId ,
            s3Key:data.key,
            filename :data.filename,
            size:data.size,
            mimeType: data.mimeType,

        },
    });
}
//list attatchements 
static async listattatchement(taskId:string){
    return prisma.attachment.findMany({
        where :{taskId },
    });
}
//download url 
static async presigndownload(attatchementId:string){
    const attatchement =await prisma.attachment.findUnique({
        where :{id:attatchementId}
    })

if(!attatchement){
    throw new NotFoundError("Attatchement not found ")
}
const command = new GetObjectCommand({
    Bucket:BUCKET,
    Key:attatchement.s3Key,
});
const url =await getSignedUrl(s3,command,{expiresIn:60})
return {url} ;
}
}
