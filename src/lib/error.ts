import Joi from "joi"

abstract class AshworthError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    cause?: Error,
  ) {
    super(message, { cause })
  }
}

export class ValidationError extends AshworthError {
  constructor(res: Joi.ValidationError) {
    super (400, res.message, res.cause as undefined | Error)
  }
}

export class UnauthenticatedError extends AshworthError {
  constructor(message: string, cause?: Error) {
    super (401, message, cause)
  }
}

export class PermissionDeniedError extends AshworthError {
  constructor(message: string, cause?: Error) {
    super (403, message, cause)
  }
}

export class NotFoundError extends AshworthError {
  constructor(message: string, cause?: Error) {
    super (404, message, cause)
  }
}

function handleError(err: unknown): Response {
  if (err instanceof AshworthError) {
    return Response.json({ error: err.message, code: err.statusCode }, { status: err.statusCode })
  }
  
  console.error(err)
  return Response.json({ error: "An unexpected error ocurred", code: 500 }, { status: 500 })
}

export async function withErrorHandling(f: () => PromiseLike<Response>): Promise<Response> {
  try {
    return await f()
  } catch (err) {
    return handleError(err)
  }
}
