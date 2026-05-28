"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scope_1 = require("../scope");
const errors_1 = require("../errors");
const helpers_1 = require("./helpers");
describe('resolveListScope', () => {
    const user = (0, helpers_1.makeUser)({ branchId: 'branch-kota-arena' });
    it('returns the user branch when no requested branch is given', () => {
        expect((0, scope_1.resolveListScope)(user)).toEqual({ branchId: 'branch-kota-arena' });
    });
    it('returns the user branch when requested branch matches the user branch', () => {
        expect((0, scope_1.resolveListScope)(user, 'branch-kota-arena')).toEqual({ branchId: 'branch-kota-arena' });
    });
    it('throws BranchScopeDeniedError when requested branch differs from user branch', () => {
        expect(() => (0, scope_1.resolveListScope)(user, 'branch-jaipur-nexa')).toThrow(errors_1.BranchScopeDeniedError);
        expect(() => (0, scope_1.resolveListScope)(user, 'branch-jaipur-nexa')).toThrow('Requested branch_id is outside your branch scope');
    });
});
describe('assertBranchInScope', () => {
    it('throws UnauthenticatedError when req.user is missing', () => {
        const req = (0, helpers_1.mockReq)({ user: undefined });
        expect(() => (0, scope_1.assertBranchInScope)(req, 'branch-001')).toThrow(errors_1.UnauthenticatedError);
        expect(() => (0, scope_1.assertBranchInScope)(req, 'branch-001')).toThrow('User context is missing');
    });
    it('throws BranchScopeDeniedError when record branch differs from user branch', () => {
        const req = (0, helpers_1.mockReq)({ user: (0, helpers_1.makeUser)({ branchId: 'branch-001' }) });
        expect(() => (0, scope_1.assertBranchInScope)(req, 'branch-002')).toThrow(errors_1.BranchScopeDeniedError);
        expect(() => (0, scope_1.assertBranchInScope)(req, 'branch-002')).toThrow('Record is outside your branch scope');
    });
    it('does not throw when record branch matches user branch', () => {
        const req = (0, helpers_1.mockReq)({ user: (0, helpers_1.makeUser)({ branchId: 'branch-001' }) });
        expect(() => (0, scope_1.assertBranchInScope)(req, 'branch-001')).not.toThrow();
    });
});
//# sourceMappingURL=scope.test.js.map