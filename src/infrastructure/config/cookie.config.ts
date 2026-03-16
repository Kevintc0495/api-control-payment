import type { CookieOptions } from "express";

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  // secure: process.env.NODE_ENV === "production", // Habilitar solo en producción
  secure: false,
  sameSite: "lax",
  maxAge: 3600000, // 1 hora
  path: "/",
};
