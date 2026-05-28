import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiError, ValidationError } from '../errors';
import { t } from '../i18n';

interface BodyParserError extends Error {
  type?: string;
  status?: number;
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction): void {
  const requestId = req.requestId ?? req.headers['x-request-id'] ?? 'unknown';
  console.error(JSON.stringify({ level: 'error', requestId, error: err instanceof Error ? { name: err.name, message: err.message } : err }));

  // Body-parser errors: malformed JSON or payload too large
  if (err instanceof Error && (err as BodyParserError).type === 'entity.parse.failed') {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 1, code: 'VALIDATION_ERROR', message: t('ERR_BODY_PARSE_FAILED') });
    return;
  }
  if (err instanceof Error && (err as BodyParserError).type === 'entity.too.large') {
    res.status(StatusCodes.REQUEST_TOO_LONG).json({ error: 1, code: 'VALIDATION_ERROR', message: t('ERR_BODY_TOO_LARGE') });
    return;
  }

  if (err instanceof ValidationError) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: 1, code: err.code, message: err.message, errors: err.fieldErrors });
    return;
  }
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ error: 1, code: err.code, message: err.message });
    return;
  }
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 1, code: 'SERVER_ERROR', message: t('ERR_SERVER_ERROR') });
}
