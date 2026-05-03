import { BaseError } from "./base.error"

export class NotFoundError extends BaseError {

  constructor(message = "Resource not found") {
    super(message, 404)
  }

}

export class UnauthorizedError extends BaseError {

  constructor(message = "Unauthorized") {
    super(message, 401)
  }

}