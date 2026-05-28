import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../errors';

interface ValidateSchemas { body?: ZodSchema; params?: ZodSchema; query?: ZodSchema; }

function flattenZodError(error: ZodError, prefix: string): Array<{ field: string; message: string }> {
  return error.errors.map(i => ({ field: i.path.length > 0 ? i.path.join('.') : prefix, message: i.message }));
}

export function validate(schemas: ValidateSchemas) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const fieldErrors: Array<{ field: string; message: string }> = [];
    if (schemas.body) { const r = schemas.body.safeParse(req.body); if (!r.success) fieldErrors.push(...flattenZodError(r.error, 'body')); else req.body = r.data; }
    if (schemas.params) { const r = schemas.params.safeParse(req.params); if (!r.success) fieldErrors.push(...flattenZodError(r.error, 'params')); else (req as { params: unknown }).params = r.data; }
    if (schemas.query) { const r = schemas.query.safeParse(req.query); if (!r.success) fieldErrors.push(...flattenZodError(r.error, 'query')); else (req as { query: unknown }).query = r.data; }
    if (fieldErrors.length > 0) { next(new ValidationError('Invalid Input', fieldErrors)); return; }
    next();
  };
}
