import { notFound } from '../../middleware/notFound';
import { NotFoundError } from '../../errors';
import { mockReq, mockRes, mockNext } from '../helpers';

describe('notFound middleware', () => {
  it('calls next with a NotFoundError describing the method and path', () => {
    const req = mockReq({ method: 'GET', path: '/api/hr/employees' });
    const next = mockNext();
    notFound(req, mockRes(), next);
    expect(next).toHaveBeenCalledTimes(1);
    const err = next.mock.calls[0][0];
    expect(err).toBeInstanceOf(NotFoundError);
    expect(err.message).toBe('Cannot GET /api/hr/employees');
    expect(err.statusCode).toBe(404);
  });

  it('works for POST requests', () => {
    const req = mockReq({ method: 'POST', path: '/api/unknown' });
    const next = mockNext();
    notFound(req, mockRes(), next);
    expect(next.mock.calls[0][0].message).toBe('Cannot POST /api/unknown');
  });
});
