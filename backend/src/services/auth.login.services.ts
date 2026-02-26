import argon2 from "argon2"
import jwt from "jsonwebtoken"
import { Userrepository } from "../Repositories/user.repository.ts"


export  class Authservice{
 async register(name: string, email: string, password: string) {

  const user = await Userrepository.findByEmail(email)
  if (user) {
    throw new Error("Invalid Name")
  }

  const hashed = await argon2.hash(password)

  const newUser = await Userrepository.create({
    name,
    email,
    password: hashed
  })

  const token = jwt.sign(
    { userId: newUser.id },
    process.env.JWT_SECRET as string
  )

  return { user: newUser, token }
}

 static async login(email: string, password: string) {

  const user = await Userrepository.findByEmail(email)
  if (!user) {
    throw new Error("Invalid Name")
  }

  const isValid = await argon2.verify(user.password, password)
  if (!isValid) {
    throw new Error("Invalid Password")
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string
  )

  return { user, token }
}
}