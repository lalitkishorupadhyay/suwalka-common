import { z } from 'zod';
import { validate } from '../../middleware/validate';
import { ValidationError } from '../../errors';
import { mockReq, mockRes, mockNext } from '../helpers';

describe('validate middleware', () => {
  describe('body validation', () => {
    const schema = { body: z.object({ name: z.string(), age: z.number() }) };

    it('parses and assigns valid body, calls next()', () => {
      const req = mockReq({ body: { name: 'Ravi', age: 30 } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      expect(next).toHaveBeenCalledWith();
      expect(req.body).toEqual({ name: 'Ravi', age: 30 });
    });

    it('calls next(ValidationError) with field-level errors on failure', () => {
      const req = mockReq({ body: { name: 123, age: 'bad' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      const err = next.mock.calls[0][0];
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.fieldErrors.length).toBeGreaterThan(0);
      expect(err.fieldErrors[0]).toHaveProperty('field');
      expect(err.fieldErrors[0]).toHaveProperty('message');
    });
  });

  describe('params validation', () => {
    const schema = { params: z.object({ id: z.string().uuid() }) };

    it('parses valid params and calls next()', () => {
      const req = mockReq({ params: { id: '550e8400-e29b-41d4-a716-446655440000' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      expect(next).toHaveBeenCalledWith();
    });

    it('calls next(ValidationError) for invalid params', () => {
      const req = mockReq({ params: { id: 'not-a-uuid' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      expect(next.mock.calls[0][0]).toBeInstanceOf(ValidationError);
    });
  });

  describe('query validation', () => {
    const schema = { query: z.object({ page: z.coerce.number().optional() }) };

    it('parses valid query and calls next()', () => {
      const req = mockReq({ query: { page: '2' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      expect(next).toHaveBeenCalledWith();
      expect((req as unknown as { query: { page: number } }).query.page).toBe(2);
    });

    it('calls next(ValidationError) for invalid query', () => {
      const badSchema = { query: z.object({ page: z.number() }) };
      const req = mockReq({ query: { page: 'abc' } });
      const next = mockNext();
      validate(badSchema)(req, mockRes(), next);
      expect(next.mock.calls[0][0]).toBeInstanceOf(ValidationError);
    });
  });

  describe('multiple schemas — combined errors', () => {
    it('accumulates errors from body and params when both fail', () => {
      const schema = {
        body: z.object({ name: z.string() }),
        params: z.object({ id: z.string().uuid() }),
      };
      const req = mockReq({ body: { name: 42 }, params: { id: 'bad' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      const err = next.mock.calls[0][0] as ValidationError;
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.fieldErrors.length).toBeGreaterThanOrEqual(2);
    });

    it('calls next() with no args when all schemas pass', () => {
      const schema = {
        body: z.object({ name: z.string() }),
        params: z.object({ id: z.string() }),
        query: z.object({ page: z.coerce.number().optional() }),
      };
      const req = mockReq({
        body: { name: 'Ravi' },
        params: { id: 'emp-001' },
        query: { page: '1' },
      });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('no schemas provided', () => {
    it('calls next() immediately with no validation', () => {
      const req = mockReq({ body: { anything: true } });
      const next = mockNext();
      validate({})(req, mockRes(), next);
      expect(next).toHaveBeenCalledWith();
    });
  });

  describe('root-level zod error (empty path)', () => {
    it('uses the schema prefix as the field name when path is empty', () => {
      // z.string() on a non-string body produces an error at path []
      const schema = { body: z.string() };
      const req = mockReq({ body: { not: 'a string' } });
      const next = mockNext();
      validate(schema)(req, mockRes(), next);
      const err = next.mock.calls[0][0] as ValidationError;
      expect(err).toBeInstanceOf(ValidationError);
      expect(err.fieldErrors[0].field).toBe('body');
    });
  });
});
