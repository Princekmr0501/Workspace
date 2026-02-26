import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
import { healthRouter } from './routes/health.route.ts'
app.use(healthRouter)


import { PrismaClient } from "./generated/prisma"
import { Pool } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
 //Create Neon pool using .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

//  Create Prisma adapter
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
})

// Pass adapter to PrismaClient
const prisma = new PrismaClient({
  adapter,
})

app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})


app.get("/create-user", async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        email: "testuser@example.com",
        password: "fakepassword123",
      },
    })

    res.json({
      message: "Fake user created successfully",
      user: newUser,
    })
  } catch (error) {
    res.json({
      error: "Error creating user",
      details: error,
    })
  }
})


app.get("/fetch-user", async (req, res) => {
  try {
    const users = await prisma.user.findMany()

    res.json({
      message: "Users fetched successfully",
      users,
    })
  } catch (error) {
    res.json({
      error: "User table does not exist or database error",
    })
  }
})
import Authrouter from './routes/auth.route.ts'
app.use("/auth", Authrouter)

const port = 5000
app.listen(port,()=>{
    console.log('working on the server')
})


