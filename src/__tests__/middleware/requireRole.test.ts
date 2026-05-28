import { requireRole } from '../../middleware/requireRole';
import { PermissionDeniedError } from '../../errors';
import { mockReq, mockRes, mockNext, makeUser } from '../helpers';

describe('requireRole middleware', () => {
  it('calls next() when user has one of the required roles', () => {
    const mw = requireRole('OWNER_GM', 'BSM_TL');
    const req = mockReq({ user: makeUser({ roles: ['BSM_TL'] }) });
    const next = mockNext();
    mw(req, mockRes(), next);
    expect(next).toHaveBeenCalledWith();
  });

  it('calls next() when user has all required roles (partial match is enough)', () => {
    const mw = requireRole('OWNER_GM');
    const req = mockReq({ user: makeUser({ roles: ['OWNER_GM', 'BSM_TL'] }) });
    const next = mockNext();
    mw(req, mockRes(), next);
    expect(next).toHaveBeenCalledWith();
  });

  it('calls next(PermissionDeniedError) when user has no matching role', () => {
    const mw = requireRole('OWNER_GM');
    const req = mockReq({ user: makeUser({ roles: ['DSE'] }) });
    const next = mockNext();
    mw(req, mockRes(), next);
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(PermissionDeniedError);
    expect((err as PermissionDeniedError).statusCode).toBe(403);
  });

  it('error message includes the required roles', () => {
    const mw = requireRole('OWNER_GM', 'BSM_TL');
    const req = mockReq({ user: makeUser({ roles: ['DSE'] }) });
    const next = mockNext();
    mw(req, mockRes(), next);
    const err = next.mock.calls[0][0] as PermissionDeniedError;
    expect(err.message).toContain('OWNER_GM');
    expect(err.message).toContain('BSM_TL');
  });

  it('calls next(PermissionDeniedError) when user has no roles at all', () => {
    const mw = requireRole('OWNER_GM');
    const req = mockReq({ user: makeUser({ roles: [] }) });
    const next = mockNext();
    mw(req, mockRes(), next);
    expect(next.mock.calls[0][0]).toBeInstanceOf(PermissionDeniedError);
  });

  it('calls next(PermissionDeniedError) when req.user is undefined', () => {
    const mw = requireRole('OWNER_GM');
    const req = mockReq({ user: undefined });
    const next = mockNext();
    mw(req, mockRes(), next);
    expect(next.mock.calls[0][0]).toBeInstanceOf(PermissionDeniedError);
  });
});
