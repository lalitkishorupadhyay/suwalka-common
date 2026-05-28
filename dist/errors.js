"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyError = exports.PermissionDeniedError = exports.ConflictError = exports.UnauthenticatedError = exports.BranchScopeDeniedError = exports.ValidationError = exports.NotFoundError = exports.ApiError = void 0;
const http_status_codes_1 = require("http-status-codes");
const i18n_1 = require("./i18n");
class ApiError extends Error {
    code;
    statusCode;
    details;
    constructor(code, message, statusCode, details) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.statusCode = statusCode;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ApiError = ApiError;
class NotFoundError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_NOT_FOUND'), details) {
        super('NOT_FOUND', message, http_status_codes_1.StatusCodes.NOT_FOUND, details);
        this.name = 'NotFoundError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.NotFoundError = NotFoundError;
class ValidationError extends ApiError {
    fieldErrors;
    constructor(message = (0, i18n_1.t)('ERR_VALIDATION'), fieldErrors = [], details) {
        super('VALIDATION_ERROR', message, http_status_codes_1.StatusCodes.BAD_REQUEST, details);
        this.name = 'ValidationError';
        this.fieldErrors = fieldErrors;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ValidationError = ValidationError;
class BranchScopeDeniedError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_BRANCH_SCOPE_DENIED'), details) {
        super('BRANCH_SCOPE_DENIED', message, http_status_codes_1.StatusCodes.FORBIDDEN, details);
        this.name = 'BranchScopeDeniedError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.BranchScopeDeniedError = BranchScopeDeniedError;
class UnauthenticatedError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_UNAUTHENTICATED'), details) {
        super('UNAUTHENTICATED', message, http_status_codes_1.StatusCodes.UNAUTHORIZED, details);
        this.name = 'UnauthenticatedError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.UnauthenticatedError = UnauthenticatedError;
class ConflictError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_CONFLICT'), details) {
        super('CONFLICT', message, http_status_codes_1.StatusCodes.CONFLICT, details);
        this.name = 'ConflictError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ConflictError = ConflictError;
class PermissionDeniedError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_PERMISSION_DENIED'), details) {
        super('PERMISSION_DENIED', message, http_status_codes_1.StatusCodes.FORBIDDEN, details);
        this.name = 'PermissionDeniedError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.PermissionDeniedError = PermissionDeniedError;
class DependencyError extends ApiError {
    constructor(message = (0, i18n_1.t)('ERR_DEPENDENCY_ERROR'), statusCode = http_status_codes_1.StatusCodes.BAD_GATEWAY, details) {
        super('DEPENDENCY_ERROR', message, statusCode, details);
        this.name = 'DependencyError';
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.DependencyError = DependencyError;
//# sourceMappingURL=errors.js.map