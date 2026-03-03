import { Authservice } from "../services/auth.login.services.ts"

const authservice = new Authservice()

export class Authcontroller {

  static async register(req: any, res: any) {
    try {
      const { name, email, password } = req.body

      const result = await authservice.register(name, email, password)

      return res.status(201).json(result)

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Registration failed"
      })
    }
  }

  static async login(req: any, res: any) {
    try {
      const { email, password } = req.body

      const result = await Authservice.login(email, password)

      return res.status(200).json(result)

    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message || "Login failed"
      })
    }
  }
}