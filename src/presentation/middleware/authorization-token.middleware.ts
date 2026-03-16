import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { TokenPayload } from "@/application/models/common/token-payload.model";
import { AccessDeniedException } from "@/application/exceptions/access-denied.exception";
import "dotenv/config";

declare module "express" {
  interface Request {
    user?: TokenPayload;
  }
}

const secretKey = String(process.env.SECRET);

export function authorizationToken(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  const authorization = request.headers.cookie as string;
  const token = authorization?.startsWith("authorization=")
    ? authorization?.replace("authorization=", "").trim()
    : authorization;
  if (!token) throw new AccessDeniedException("Acceso denegado falta token");

  try {
    const validate = jwt.verify(token, secretKey);
    request.user = validate as TokenPayload;
    next();
  } catch (_error) {
    throw new AccessDeniedException("Acceso denegado token invalido");
  }
}
