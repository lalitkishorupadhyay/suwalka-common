"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("../../middleware/errorHandler");
const errors_1 = require("../../errors");
const helpers_1 = require("../helpers");
beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterEach(() => {
    jest.restoreAllMocks();
});
describe('errorHandler middleware', () => {
    it('formats ValidationError as 400 with fieldErrors', () => {
        const fields = [{ field: 'email', message: 'required' }];
        const err = new errors_1.ValidationError('Invalid Input', fields);
        const req = (0, helpers_1.mockReq)({ requestId: 'req-1' });
        const res = (0, helpers_1.mockRes)();
        (0, errorHandler_1.errorHandler)(err, req, res, (0, helpers_1.mockNext)());
        expect(res._status).toBe(400);
        expect(res._body).toEqual({
            error: 1,
            code: 'VALIDATION_ERROR',
            message: 'Invalid Input',
            errors: fields,
        });
    });
    it('formats ApiError subclass with the correct statusCode and code', () => {
        const err = new errors_1.NotFoundError('Employee not found');
        const req = (0, helpers_1.mockReq)({ requestId: 'req-2' });
        const res = (0, helpers_1.mockRes)();
        (0, errorHandler_1.errorHandler)(err, req, res, (0, helpers_1.mockNext)());
        expect(res._status).toBe(404);
        expect(res._body).toEqual({
            error: 1,
            code: 'NOT_FOUND',
            message: 'Employee not found',
        });
    });
    it('formats a generic Error as 500 SERVER_ERROR', () => {
        const err = new Error('something blew up');
        const req = (0, helpers_1.mockReq)({ requestId: 'req-3' });
        const res = (0, helpers_1.mockRes)();
        (0, errorHandler_1.errorHandler)(err, req, res, (0, helpers_1.mockNext)());
        expect(res._status).toBe(500);
        expect(res._body).toEqual({
            error: 1,
            code: 'SERVER_ERROR',
            message: 'Internal server error',
        });
    });
    it('formats a non-Error thrown value as 500', () => {
        const req = (0, helpers_1.mockReq)({ requestId: 'req-4' });
        const res = (0, helpers_1.mockRes)();
        (0, errorHandler_1.errorHandler)('raw string thrown', req, res, (0, helpers_1.mockNext)());
        expect(res._status).toBe(500);
    });
    it('reads requestId from req.requestId when available', () => {
        const err = new errors_1.ApiError('CODE', 'msg', 400);
        const req = (0, helpers_1.mockReq)({ requestId: 'from-prop' });
        (0, errorHandler_1.errorHandler)(err, req, (0, helpers_1.mockRes)(), (0, helpers_1.mockNext)());
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('from-prop'));
    });
    it('falls back to x-request-id header when req.requestId is absent', () => {
        const err = new errors_1.ApiError('CODE', 'msg', 400);
        const req = (0, helpers_1.mockReq)({ headers: { 'x-request-id': 'from-header' } });
        (0, errorHandler_1.errorHandler)(err, req, (0, helpers_1.mockRes)(), (0, helpers_1.mockNext)());
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('from-header'));
    });
    it('uses "unknown" when no requestId source is present', () => {
        const err = new errors_1.ApiError('CODE', 'msg', 400);
        const req = (0, helpers_1.mockReq)({ headers: {} });
        (0, errorHandler_1.errorHandler)(err, req, (0, helpers_1.mockRes)(), (0, helpers_1.mockNext)());
        expect(console.error).toHaveBeenCalledWith(expect.stringContaining('unknown'));
    });
    it('logs error name and message for Error instances', () => {
        const err = new errors_1.NotFoundError('Not here');
        const req = (0, helpers_1.mockReq)({ requestId: 'r1' });
        (0, errorHandler_1.errorHandler)(err, req, (0, helpers_1.mockRes)(), (0, helpers_1.mockNext)());
        const logged = console.error.mock.calls[0][0];
        const parsed = JSON.parse(logged);
        expect(parsed.error.name).toBe('NotFoundError');
        expect(parsed.error.message).toBe('Not here');
    });
    it('logs the raw value for non-Error throws', () => {
        const req = (0, helpers_1.mockReq)({ requestId: 'r2' });
        (0, errorHandler_1.errorHandler)({ weird: 'object' }, req, (0, helpers_1.mockRes)(), (0, helpers_1.mockNext)());
        const logged = console.error.mock.calls[0][0];
        const parsed = JSON.parse(logged);
        expect(parsed.error).toEqual({ weird: 'object' });
    });
});
//# sourceMappingURL=errorHandler.test.js.map