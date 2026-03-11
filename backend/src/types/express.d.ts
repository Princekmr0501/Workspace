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

type AuthenticatedRequest = Request & {user:any}
export {AuthenticatedRequest}