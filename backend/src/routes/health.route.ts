import { Router } from 'express'
const healthRouter = Router()
healthRouter.get('/health',(req,res)=>{
    try{
        res.status(200).send({
            status: 'ok',
            message: 'working on the server',
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development'
        })
    }
    catch(err:unknown){
        console.error(err)
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        res.status(500).send({
            status: 'error',
            message: errorMessage
        })
    }
})
export { healthRouter }
