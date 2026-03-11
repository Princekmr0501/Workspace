import "express"
import { Request } from "express"

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
      }
    }
  }
}

type User = {
  userId: string
}

type AuthenticatedRequest = Request & {user: User}

export {
  AuthenticatedRequest,
  User
}