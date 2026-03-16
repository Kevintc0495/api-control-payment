import 'express';
import type { TokenPayload } from '@/application/models/common/token-payload.model';

declare module "html-pdf-new";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload; // Puedes reemplazar `any` con un tipo más específico si lo deseas
    }
  }
}
