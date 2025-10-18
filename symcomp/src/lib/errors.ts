export class AppError extends Error {
  public readonly code: string
  public readonly status: number

  constructor(message: string, code: string, status = 500) {
    super(message)
    this.name = this.constructor.name
    this.code = code
    this.status = status
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Not authenticated') {
    super(message, 'AUTHENTICATION_ERROR', 401)
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Not authorized') {
    super(message, 'AUTHORIZATION_ERROR', 403)
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 'NOT_FOUND_ERROR', 404)
  }
}
