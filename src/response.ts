import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { t } from './i18n';

export interface CollectionOptions<T> {
  results: T[];
  page: number;
  total?: number;
}

export function sendRecord<T>(res: Response, result: T, statusCode: number = StatusCodes.OK): void {
  res.status(statusCode).json({ error: 0, code: 'SUCCESS', message: t('SUCCESS'), result });
}

export function sendCollection<T>(res: Response, options: CollectionOptions<T>): void {
  const body: Record<string, unknown> = {
    error: 0, code: 'SUCCESS', message: t('SUCCESS'),
    page: options.page, results: options.results,
  };
  if (options.total !== undefined) body.total_records = options.total;
  res.status(StatusCodes.OK).json(body);
}
