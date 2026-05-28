import type { Request } from 'express';
import { BranchScopeDeniedError, UnauthenticatedError } from './errors';
import type { AuthUser } from './types/auth';

export function resolveListScope(user: AuthUser, requestedBranchId?: string): { branchId: string } {
  if (requestedBranchId !== undefined && requestedBranchId !== user.branchId) {
    throw new BranchScopeDeniedError('Requested branch_id is outside your branch scope');
  }
  return { branchId: user.branchId };
}

export function assertBranchInScope(req: Request, recordBranchId: string): void {
  if (!req.user) throw new UnauthenticatedError('User context is missing');
  if (req.user.branchId !== recordBranchId) throw new BranchScopeDeniedError('Record is outside your branch scope');
}
