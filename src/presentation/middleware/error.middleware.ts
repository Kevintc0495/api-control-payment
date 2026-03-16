import type { Request, Response, NextFunction } from "express";
import { ErrorModel } from "@/application/models/error/error.model";
import { NotFoundException } from "@/application/exceptions/not-found.exception";
import { ValidationException } from "@/application/exceptions/validation.exception";
import { TokenException } from "@/application/exceptions/token.exception";
import { CredentialsException } from "@/application/exceptions/credentials.exception";
import { AccessDeniedException } from "@/application/exceptions/access-denied.exception";
import { CodeErrorException } from "@/application/exceptions/code-error.exception";

function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const response: ErrorModel = new ErrorModel();

  if (error instanceof NotFoundException) {
    response.status = 404;
    response.code = "NOT_FOUND";
    response.message = error.message;
    response.details = error.stack ?? "";
  } else if (error instanceof ValidationException) {
    response.status = 403;
    response.code = "VALIDATION_ERROR";
    response.message = error.message;
    response.details = "Se presentarón uno o mas errores de validación";
  } else if (error instanceof TokenException) {
    response.status = 401;
    response.code = "UNAUTHORIZED";
    response.message = error.message;
    response.details = error.stack ?? "";
  } else if (error instanceof CredentialsException) {
    response.status = 403;
    response.code = "CREDENTIALS_ERROR";
    response.message = error.message;
    response.details = error.stack ?? "";
  } else if (error instanceof AccessDeniedException) {
    response.status = 401;
    response.code = "ACCESS_DENIED";
    response.message = error.message;
    response.details = error.stack ?? "";
  } else if (error instanceof CodeErrorException) {
    response.status = 404;
    response.code = "CODE_ERROR";
    response.message = error.message;
    response.details = error.stack ?? "";
  } else {
    response.status = 500;
    response.code = "INTERNAL_SERVER_ERROR";
    response.message = "Se presentó un error interno en el servidor";
    response.details = error.stack ?? "";
  }

  res.status(response.status).json(response);
}

export default errorMiddleware;
