import { StatusCodes } from 'http-status-codes';
import { t } from './i18n';

export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;
  constructor(code: string, message: string, statusCode: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = t('ERR_NOT_FOUND'), details?: unknown) {
    super('NOT_FOUND', message, StatusCodes.NOT_FOUND, details);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ValidationError extends ApiError {
  public readonly fieldErrors: Array<{ field: string; message: string }>;
  constructor(message = t('ERR_VALIDATION'), fieldErrors: Array<{ field: string; message: string }> = [], details?: unknown) {
    super('VALIDATION_ERROR', message, StatusCodes.BAD_REQUEST, details);
    this.name = 'ValidationError';
    this.fieldErrors = fieldErrors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class BranchScopeDeniedError extends ApiError {
  constructor(message = t('ERR_BRANCH_SCOPE_DENIED'), details?: unknown) {
    super('BRANCH_SCOPE_DENIED', message, StatusCodes.FORBIDDEN, details);
    this.name = 'BranchScopeDeniedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnauthenticatedError extends ApiError {
  constructor(message = t('ERR_UNAUTHENTICATED'), details?: unknown) {
    super('UNAUTHENTICATED', message, StatusCodes.UNAUTHORIZED, details);
    this.name = 'UnauthenticatedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ConflictError extends ApiError {
  constructor(message = t('ERR_CONFLICT'), details?: unknown) {
    super('CONFLICT', message, StatusCodes.CONFLICT, details);
    this.name = 'ConflictError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class PermissionDeniedError extends ApiError {
  constructor(message = t('ERR_PERMISSION_DENIED'), details?: unknown) {
    super('PERMISSION_DENIED', message, StatusCodes.FORBIDDEN, details);
    this.name = 'PermissionDeniedError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class DependencyError extends ApiError {
  constructor(
    message = t('ERR_DEPENDENCY_ERROR'),
    statusCode: typeof StatusCodes.BAD_GATEWAY | typeof StatusCodes.SERVICE_UNAVAILABLE = StatusCodes.BAD_GATEWAY,
    details?: unknown,
  ) {
    super('DEPENDENCY_ERROR', message, statusCode, details);
    this.name = 'DependencyError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
