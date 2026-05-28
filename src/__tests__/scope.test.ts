import { resolveListScope, assertBranchInScope } from '../scope';
import { BranchScopeDeniedError, UnauthenticatedError } from '../errors';
import { makeUser, mockReq } from './helpers';

describe('resolveListScope', () => {
  const user = makeUser({ branchId: 'branch-kota-arena' });

  it('returns the user branch when no requested branch is given', () => {
    expect(resolveListScope(user)).toEqual({ branchId: 'branch-kota-arena' });
  });

  it('returns the user branch when requested branch matches the user branch', () => {
    expect(resolveListScope(user, 'branch-kota-arena')).toEqual({ branchId: 'branch-kota-arena' });
  });

  it('throws BranchScopeDeniedError when requested branch differs from user branch', () => {
    expect(() => resolveListScope(user, 'branch-jaipur-nexa')).toThrow(BranchScopeDeniedError);
    expect(() => resolveListScope(user, 'branch-jaipur-nexa')).toThrow(
      'Requested branch_id is outside your branch scope'
    );
  });
});

describe('assertBranchInScope', () => {
  it('throws UnauthenticatedError when req.user is missing', () => {
    const req = mockReq({ user: undefined });
    expect(() => assertBranchInScope(req, 'branch-001')).toThrow(UnauthenticatedError);
    expect(() => assertBranchInScope(req, 'branch-001')).toThrow('User context is missing');
  });

  it('throws BranchScopeDeniedError when record branch differs from user branch', () => {
    const req = mockReq({ user: makeUser({ branchId: 'branch-001' }) });
    expect(() => assertBranchInScope(req, 'branch-002')).toThrow(BranchScopeDeniedError);
    expect(() => assertBranchInScope(req, 'branch-002')).toThrow(
      'Record is outside your branch scope'
    );
  });

  it('does not throw when record branch matches user branch', () => {
    const req = mockReq({ user: makeUser({ branchId: 'branch-001' }) });
    expect(() => assertBranchInScope(req, 'branch-001')).not.toThrow();
  });
});
