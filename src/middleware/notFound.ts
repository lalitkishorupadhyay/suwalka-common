import type { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors';

export function notFound(req: Request, _res: Response, next: NextFunction): void {
  next(new NotFoundError(`Cannot ${req.method} ${req.path}`));
}
