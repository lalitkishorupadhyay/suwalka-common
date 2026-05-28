import type { Request, Response, NextFunction } from 'express';
import { UnauthenticatedError } from '../errors';
import type { AuthUser } from '../types/auth';

interface OidcUserinfo { sub: string; email?: string; roles?: string[]; [key: string]: unknown; }

const pick = (h: string | string[] | undefined): string =>
  typeof h === 'string' ? h : Array.isArray(h) ? h[0] : '';

export function readUser(req: Request, res: Response, next: NextFunction): void {
  const raw = req.headers['x-userinfo'];
  if (!raw || typeof raw !== 'string') { next(new UnauthenticatedError('Missing X-Userinfo header')); return; }

  let info: OidcUserinfo;
  try {
    const parsed: unknown = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
    if (typeof parsed !== 'object' || parsed === null) throw new Error();
    info = parsed as OidcUserinfo;
  } catch { next(new UnauthenticatedError('X-Userinfo header is malformed')); return; }

  if (!info.sub || typeof info.sub !== 'string') { next(new UnauthenticatedError('X-Userinfo missing sub')); return; }

  const user: AuthUser = {
    id: info.sub,
    email: typeof info.email === 'string' ? info.email : '',
    roles: Array.isArray(info.roles) ? info.roles : [],
    tenantId: pick(req.headers['x-tenant-id']),
    orgId: pick(req.headers['x-org-id']),
    branchId: pick(req.headers['x-branch-id']),
    requestId: pick(req.headers['x-request-id']),
  };
  req.user = user;
  req.requestId = user.requestId;
  next();
}
