import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())

import { healthRouter } from './routes/health.route.ts'
app.use(healthRouter)

const port = 5000
app.listen(port,()=>{
    console.log('working on the server')
})

