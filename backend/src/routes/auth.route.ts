import express from "express"
const Authrouter = express.Router()

import { Authcontroller } from "../controllers/auth.controller.ts"

Authrouter.post("/register",Authcontroller.register)
Authrouter.post("/login",Authcontroller.login)

export  default Authrouter