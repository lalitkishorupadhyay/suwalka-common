"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const validate_1 = require("../../middleware/validate");
const errors_1 = require("../../errors");
const helpers_1 = require("../helpers");
describe('validate middleware', () => {
    describe('body validation', () => {
        const schema = { body: zod_1.z.object({ name: zod_1.z.string(), age: zod_1.z.number() }) };
        it('parses and assigns valid body, calls next()', () => {
            const req = (0, helpers_1.mockReq)({ body: { name: 'Ravi', age: 30 } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            expect(next).toHaveBeenCalledWith();
            expect(req.body).toEqual({ name: 'Ravi', age: 30 });
        });
        it('calls next(ValidationError) with field-level errors on failure', () => {
            const req = (0, helpers_1.mockReq)({ body: { name: 123, age: 'bad' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            const err = next.mock.calls[0][0];
            expect(err).toBeInstanceOf(errors_1.ValidationError);
            expect(err.fieldErrors.length).toBeGreaterThan(0);
            expect(err.fieldErrors[0]).toHaveProperty('field');
            expect(err.fieldErrors[0]).toHaveProperty('message');
        });
    });
    describe('params validation', () => {
        const schema = { params: zod_1.z.object({ id: zod_1.z.string().uuid() }) };
        it('parses valid params and calls next()', () => {
            const req = (0, helpers_1.mockReq)({ params: { id: '550e8400-e29b-41d4-a716-446655440000' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            expect(next).toHaveBeenCalledWith();
        });
        it('calls next(ValidationError) for invalid params', () => {
            const req = (0, helpers_1.mockReq)({ params: { id: 'not-a-uuid' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            expect(next.mock.calls[0][0]).toBeInstanceOf(errors_1.ValidationError);
        });
    });
    describe('query validation', () => {
        const schema = { query: zod_1.z.object({ page: zod_1.z.coerce.number().optional() }) };
        it('parses valid query and calls next()', () => {
            const req = (0, helpers_1.mockReq)({ query: { page: '2' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            expect(next).toHaveBeenCalledWith();
            expect(req.query.page).toBe(2);
        });
        it('calls next(ValidationError) for invalid query', () => {
            const badSchema = { query: zod_1.z.object({ page: zod_1.z.number() }) };
            const req = (0, helpers_1.mockReq)({ query: { page: 'abc' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(badSchema)(req, (0, helpers_1.mockRes)(), next);
            expect(next.mock.calls[0][0]).toBeInstanceOf(errors_1.ValidationError);
        });
    });
    describe('multiple schemas — combined errors', () => {
        it('accumulates errors from body and params when both fail', () => {
            const schema = {
                body: zod_1.z.object({ name: zod_1.z.string() }),
                params: zod_1.z.object({ id: zod_1.z.string().uuid() }),
            };
            const req = (0, helpers_1.mockReq)({ body: { name: 42 }, params: { id: 'bad' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            const err = next.mock.calls[0][0];
            expect(err).toBeInstanceOf(errors_1.ValidationError);
            expect(err.fieldErrors.length).toBeGreaterThanOrEqual(2);
        });
        it('calls next() with no args when all schemas pass', () => {
            const schema = {
                body: zod_1.z.object({ name: zod_1.z.string() }),
                params: zod_1.z.object({ id: zod_1.z.string() }),
                query: zod_1.z.object({ page: zod_1.z.coerce.number().optional() }),
            };
            const req = (0, helpers_1.mockReq)({
                body: { name: 'Ravi' },
                params: { id: 'emp-001' },
                query: { page: '1' },
            });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            expect(next).toHaveBeenCalledWith();
        });
    });
    describe('no schemas provided', () => {
        it('calls next() immediately with no validation', () => {
            const req = (0, helpers_1.mockReq)({ body: { anything: true } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)({})(req, (0, helpers_1.mockRes)(), next);
            expect(next).toHaveBeenCalledWith();
        });
    });
    describe('root-level zod error (empty path)', () => {
        it('uses the schema prefix as the field name when path is empty', () => {
            // z.string() on a non-string body produces an error at path []
            const schema = { body: zod_1.z.string() };
            const req = (0, helpers_1.mockReq)({ body: { not: 'a string' } });
            const next = (0, helpers_1.mockNext)();
            (0, validate_1.validate)(schema)(req, (0, helpers_1.mockRes)(), next);
            const err = next.mock.calls[0][0];
            expect(err).toBeInstanceOf(errors_1.ValidationError);
            expect(err.fieldErrors[0].field).toBe('body');
        });
    });
});
//# sourceMappingURL=validate.test.js.map