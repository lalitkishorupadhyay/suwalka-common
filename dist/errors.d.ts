import { StatusCodes } from 'http-status-codes';
export declare class ApiError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly details?: unknown;
    constructor(code: string, message: string, statusCode: number, details?: unknown);
}
export declare class NotFoundError extends ApiError {
    constructor(message?: string, details?: unknown);
}
export declare class ValidationError extends ApiError {
    readonly fieldErrors: Array<{
        field: string;
        message: string;
    }>;
    constructor(message?: string, fieldErrors?: Array<{
        field: string;
        message: string;
    }>, details?: unknown);
}
export declare class BranchScopeDeniedError extends ApiError {
    constructor(message?: string, details?: unknown);
}
export declare class UnauthenticatedError extends ApiError {
    constructor(message?: string, details?: unknown);
}
export declare class ConflictError extends ApiError {
    constructor(message?: string, details?: unknown);
}
export declare class PermissionDeniedError extends ApiError {
    constructor(message?: string, details?: unknown);
}
export declare class DependencyError extends ApiError {
    constructor(message?: string, statusCode?: typeof StatusCodes.BAD_GATEWAY | typeof StatusCodes.SERVICE_UNAVAILABLE, details?: unknown);
}
//# sourceMappingURL=errors.d.ts.map