"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
describe('ApiError', () => {
    it('sets all properties correctly', () => {
        const err = new errors_1.ApiError('MY_CODE', 'my message', 418, { hint: 'x' });
        expect(err.code).toBe('MY_CODE');
        expect(err.message).toBe('my message');
        expect(err.statusCode).toBe(418);
        expect(err.details).toEqual({ hint: 'x' });
        expect(err.name).toBe('ApiError');
        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(errors_1.ApiError);
    });
    it('works without details', () => {
        const err = new errors_1.ApiError('CODE', 'msg', 400);
        expect(err.details).toBeUndefined();
    });
});
describe('NotFoundError', () => {
    it('uses defaults', () => {
        const err = new errors_1.NotFoundError();
        expect(err.code).toBe('NOT_FOUND');
        expect(err.statusCode).toBe(404);
        expect(err.message).toBe('Resource not found');
        expect(err.name).toBe('NotFoundError');
    });
    it('accepts custom message and details', () => {
        const err = new errors_1.NotFoundError('Employee not found', { id: '123' });
        expect(err.message).toBe('Employee not found');
        expect(err.details).toEqual({ id: '123' });
    });
    it('is instanceof ApiError and Error', () => {
        const err = new errors_1.NotFoundError();
        expect(err).toBeInstanceOf(errors_1.ApiError);
        expect(err).toBeInstanceOf(Error);
        expect(err).toBeInstanceOf(errors_1.NotFoundError);
    });
});
describe('ValidationError', () => {
    it('uses defaults', () => {
        const err = new errors_1.ValidationError();
        expect(err.code).toBe('VALIDATION_ERROR');
        expect(err.statusCode).toBe(400);
        expect(err.message).toBe('Invalid Input');
        expect(err.fieldErrors).toEqual([]);
        expect(err.name).toBe('ValidationError');
    });
    it('accepts field errors', () => {
        const fields = [{ field: 'email', message: 'must be a valid email' }];
        const err = new errors_1.ValidationError('Bad input', fields);
        expect(err.fieldErrors).toEqual(fields);
        expect(err.message).toBe('Bad input');
    });
    it('accepts details', () => {
        const err = new errors_1.ValidationError('msg', [], { raw: true });
        expect(err.details).toEqual({ raw: true });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.ValidationError()).toBeInstanceOf(errors_1.ApiError);
    });
});
describe('BranchScopeDeniedError', () => {
    it('uses defaults', () => {
        const err = new errors_1.BranchScopeDeniedError();
        expect(err.code).toBe('BRANCH_SCOPE_DENIED');
        expect(err.statusCode).toBe(403);
        expect(err.message).toBe('Record is outside your branch scope');
        expect(err.name).toBe('BranchScopeDeniedError');
    });
    it('accepts custom message', () => {
        const err = new errors_1.BranchScopeDeniedError('Custom scope message', { id: 'x' });
        expect(err.message).toBe('Custom scope message');
        expect(err.details).toEqual({ id: 'x' });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.BranchScopeDeniedError()).toBeInstanceOf(errors_1.ApiError);
    });
});
describe('UnauthenticatedError', () => {
    it('uses defaults', () => {
        const err = new errors_1.UnauthenticatedError();
        expect(err.code).toBe('UNAUTHENTICATED');
        expect(err.statusCode).toBe(401);
        expect(err.message).toBe('Authentication required');
        expect(err.name).toBe('UnauthenticatedError');
    });
    it('accepts custom message', () => {
        const err = new errors_1.UnauthenticatedError('Token expired', { exp: 0 });
        expect(err.message).toBe('Token expired');
        expect(err.details).toEqual({ exp: 0 });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.UnauthenticatedError()).toBeInstanceOf(errors_1.ApiError);
    });
});
describe('ConflictError', () => {
    it('uses defaults', () => {
        const err = new errors_1.ConflictError();
        expect(err.code).toBe('CONFLICT');
        expect(err.statusCode).toBe(409);
        expect(err.message).toBe('Resource conflict');
        expect(err.name).toBe('ConflictError');
    });
    it('accepts custom message and details', () => {
        const err = new errors_1.ConflictError('Email already exists', { field: 'email' });
        expect(err.message).toBe('Email already exists');
        expect(err.details).toEqual({ field: 'email' });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.ConflictError()).toBeInstanceOf(errors_1.ApiError);
    });
});
describe('PermissionDeniedError', () => {
    it('uses defaults', () => {
        const err = new errors_1.PermissionDeniedError();
        expect(err.code).toBe('PERMISSION_DENIED');
        expect(err.statusCode).toBe(403);
        expect(err.message).toBe('You do not have permission to perform this action');
        expect(err.name).toBe('PermissionDeniedError');
    });
    it('accepts custom message and details', () => {
        const err = new errors_1.PermissionDeniedError('Admins only', { role: 'DSE' });
        expect(err.message).toBe('Admins only');
        expect(err.details).toEqual({ role: 'DSE' });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.PermissionDeniedError()).toBeInstanceOf(errors_1.ApiError);
    });
});
describe('DependencyError', () => {
    it('uses defaults (502)', () => {
        const err = new errors_1.DependencyError();
        expect(err.code).toBe('DEPENDENCY_ERROR');
        expect(err.statusCode).toBe(502);
        expect(err.message).toBe('A dependency service failed or was unavailable');
        expect(err.name).toBe('DependencyError');
    });
    it('accepts 503 statusCode', () => {
        const err = new errors_1.DependencyError('Service down', 503);
        expect(err.statusCode).toBe(503);
        expect(err.message).toBe('Service down');
    });
    it('accepts 502 statusCode explicitly', () => {
        const err = new errors_1.DependencyError('Bad gateway', 502, { url: '/api' });
        expect(err.statusCode).toBe(502);
        expect(err.details).toEqual({ url: '/api' });
    });
    it('is instanceof ApiError', () => {
        expect(new errors_1.DependencyError()).toBeInstanceOf(errors_1.ApiError);
    });
});
//# sourceMappingURL=errors.test.js.map