import { S3Client }  from "@aws-sdk/client-s3"
// here my project is talking to the Amazon s3 using its credentials
export const s3 = new S3Client({
region:process.env.AWS_REGION!,
credentials :{
    accessKeyId:process.env.AWS_ACCESS_KEY!,
    secretAccessKey:process.env.AWS_SECRET_KEY!
}
})