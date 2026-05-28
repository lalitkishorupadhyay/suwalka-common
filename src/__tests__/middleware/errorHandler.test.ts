import { errorHandler } from '../../middleware/errorHandler';
import { ApiError, ValidationError, NotFoundError } from '../../errors';
import { mockReq, mockRes, mockNext } from '../helpers';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('errorHandler middleware', () => {
  it('formats ValidationError as 400 with fieldErrors', () => {
    const fields = [{ field: 'email', message: 'required' }];
    const err = new ValidationError('Invalid Input', fields);
    const req = mockReq({ requestId: 'req-1' });
    const res = mockRes();
    errorHandler(err, req, res, mockNext());
    expect(res._status).toBe(400);
    expect(res._body).toEqual({
      error: 1,
      code: 'VALIDATION_ERROR',
      message: 'Invalid Input',
      errors: fields,
    });
  });

  it('formats ApiError subclass with the correct statusCode and code', () => {
    const err = new NotFoundError('Employee not found');
    const req = mockReq({ requestId: 'req-2' });
    const res = mockRes();
    errorHandler(err, req, res, mockNext());
    expect(res._status).toBe(404);
    expect(res._body).toEqual({
      error: 1,
      code: 'NOT_FOUND',
      message: 'Employee not found',
    });
  });

  it('formats a generic Error as 500 SERVER_ERROR', () => {
    const err = new Error('something blew up');
    const req = mockReq({ requestId: 'req-3' });
    const res = mockRes();
    errorHandler(err, req, res, mockNext());
    expect(res._status).toBe(500);
    expect(res._body).toEqual({
      error: 1,
      code: 'SERVER_ERROR',
      message: 'Internal server error',
    });
  });

  it('formats a non-Error thrown value as 500', () => {
    const req = mockReq({ requestId: 'req-4' });
    const res = mockRes();
    errorHandler('raw string thrown', req, res, mockNext());
    expect(res._status).toBe(500);
  });

  it('reads requestId from req.requestId when available', () => {
    const err = new ApiError('CODE', 'msg', 400);
    const req = mockReq({ requestId: 'from-prop' });
    errorHandler(err, req, mockRes(), mockNext());
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('from-prop')
    );
  });

  it('falls back to x-request-id header when req.requestId is absent', () => {
    const err = new ApiError('CODE', 'msg', 400);
    const req = mockReq({ headers: { 'x-request-id': 'from-header' } });
    errorHandler(err, req, mockRes(), mockNext());
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('from-header')
    );
  });

  it('uses "unknown" when no requestId source is present', () => {
    const err = new ApiError('CODE', 'msg', 400);
    const req = mockReq({ headers: {} });
    errorHandler(err, req, mockRes(), mockNext());
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('unknown')
    );
  });

  it('logs error name and message for Error instances', () => {
    const err = new NotFoundError('Not here');
    const req = mockReq({ requestId: 'r1' });
    errorHandler(err, req, mockRes(), mockNext());
    const logged = (console.error as jest.Mock).mock.calls[0][0] as string;
    const parsed = JSON.parse(logged);
    expect(parsed.error.name).toBe('NotFoundError');
    expect(parsed.error.message).toBe('Not here');
  });

  it('logs the raw value for non-Error throws', () => {
    const req = mockReq({ requestId: 'r2' });
    errorHandler({ weird: 'object' }, req, mockRes(), mockNext());
    const logged = (console.error as jest.Mock).mock.calls[0][0] as string;
    const parsed = JSON.parse(logged);
    expect(parsed.error).toEqual({ weird: 'object' });
  });

  it('returns 400 with VALIDATION_ERROR for entity.parse.failed (malformed JSON body)', () => {
    const err = Object.assign(new SyntaxError('Unexpected token'), { type: 'entity.parse.failed', status: 400 });
    const req = mockReq({ requestId: 'req-bp-1' });
    const res = mockRes();
    errorHandler(err, req, res, mockNext());
    expect(res._status).toBe(400);
    expect(res._body).toEqual({ error: 1, code: 'VALIDATION_ERROR', message: 'Invalid JSON body' });
  });

  it('returns 413 with VALIDATION_ERROR for entity.too.large (payload too large)', () => {
    const err = Object.assign(new Error('request entity too large'), { type: 'entity.too.large', status: 413 });
    const req = mockReq({ requestId: 'req-bp-2' });
    const res = mockRes();
    errorHandler(err, req, res, mockNext());
    expect(res._status).toBe(413);
    expect(res._body).toEqual({ error: 1, code: 'VALIDATION_ERROR', message: 'Request body too large' });
  });
});
