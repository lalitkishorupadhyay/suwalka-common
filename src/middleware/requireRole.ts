import type { Request, Response, NextFunction } from 'express';
import { PermissionDeniedError } from '../errors';

export function requireRole(...roles: string[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const userRoles = req.user?.roles ?? [];
    const hasRole = roles.some(r => userRoles.includes(r));
    if (!hasRole) {
      next(new PermissionDeniedError(`Requires one of: ${roles.join(', ')}`));
      return;
    }
    next();
  };
}
