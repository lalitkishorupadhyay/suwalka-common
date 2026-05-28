import type { Request } from 'express';
import type { AuthUser } from './types/auth';
export declare function resolveListScope(user: AuthUser, requestedBranchId?: string): {
    branchId: string;
};
export declare function assertBranchInScope(req: Request, recordBranchId: string): void;
//# sourceMappingURL=scope.d.ts.map