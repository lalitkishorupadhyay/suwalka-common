"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readUser_1 = require("../../middleware/readUser");
const errors_1 = require("../../errors");
const helpers_1 = require("../helpers");
describe('readUser middleware', () => {
    it('calls next(UnauthenticatedError) when X-Userinfo header is absent', () => {
        const req = (0, helpers_1.mockReq)({ headers: {} });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('Missing X-Userinfo header');
    });
    it('calls next(UnauthenticatedError) when X-Userinfo is an array (non-string)', () => {
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': ['val1', 'val2'] } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('Missing X-Userinfo header');
    });
    it('calls next(UnauthenticatedError) when Base64 decodes to invalid JSON', () => {
        const raw = Buffer.from('not valid json').toString('base64');
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('X-Userinfo header is malformed');
    });
    it('calls next(UnauthenticatedError) when parsed value is null', () => {
        const raw = Buffer.from('null').toString('base64');
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('X-Userinfo header is malformed');
    });
    it('calls next(UnauthenticatedError) when parsed value is a primitive (number)', () => {
        const raw = Buffer.from('42').toString('base64');
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('X-Userinfo header is malformed');
    });
    it('calls next(UnauthenticatedError) when sub is missing (falsy)', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ email: 'x@y.com' });
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('X-Userinfo missing sub');
    });
    it('calls next(UnauthenticatedError) when sub is a number (truthy but not string)', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 12345, email: 'x@y.com' });
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith(expect.any(errors_1.UnauthenticatedError));
        expect(next.mock.calls[0][0].message).toBe('X-Userinfo missing sub');
    });
    it('sets req.user and calls next() on a fully valid request', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 'user-001', email: 'dev@suwalka.in', roles: ['DSE'] });
        const req = (0, helpers_1.mockReq)({
            headers: {
                'x-userinfo': raw,
                'x-tenant-id': 'tenant-001',
                'x-branch-id': 'branch-001',
                'x-request-id': 'req-xyz',
            },
        });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user).toEqual({
            id: 'user-001',
            email: 'dev@suwalka.in',
            roles: ['DSE'],
            tenantId: 'tenant-001',
            branchId: 'branch-001',
            requestId: 'req-xyz',
        });
        expect(req.requestId).toBe('req-xyz');
    });
    it('defaults email to empty string when email is not in the blob', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 'user-002' });
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user?.email).toBe('');
    });
    it('defaults roles to [] when roles are absent from the blob', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 'user-003' });
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user?.roles).toEqual([]);
    });
    it('picks first element when X-Tenant-Id is an array', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 'user-004' });
        const req = (0, helpers_1.mockReq)({
            headers: {
                'x-userinfo': raw,
                'x-tenant-id': ['tenant-A', 'tenant-B'],
            },
        });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user?.tenantId).toBe('tenant-A');
    });
    it('returns empty string for X-Branch-Id when header is absent', () => {
        const raw = (0, helpers_1.encodeUserinfo)({ sub: 'user-005' });
        const req = (0, helpers_1.mockReq)({ headers: { 'x-userinfo': raw } });
        const next = (0, helpers_1.mockNext)();
        (0, readUser_1.readUser)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledWith();
        expect(req.user?.branchId).toBe('');
    });
});
//# sourceMappingURL=readUser.test.js.map