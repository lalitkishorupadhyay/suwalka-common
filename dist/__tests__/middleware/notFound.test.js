"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound_1 = require("../../middleware/notFound");
const errors_1 = require("../../errors");
const helpers_1 = require("../helpers");
describe('notFound middleware', () => {
    it('calls next with a NotFoundError describing the method and path', () => {
        const req = (0, helpers_1.mockReq)({ method: 'GET', path: '/api/hr/employees' });
        const next = (0, helpers_1.mockNext)();
        (0, notFound_1.notFound)(req, (0, helpers_1.mockRes)(), next);
        expect(next).toHaveBeenCalledTimes(1);
        const err = next.mock.calls[0][0];
        expect(err).toBeInstanceOf(errors_1.NotFoundError);
        expect(err.message).toBe('Cannot GET /api/hr/employees');
        expect(err.statusCode).toBe(404);
    });
    it('works for POST requests', () => {
        const req = (0, helpers_1.mockReq)({ method: 'POST', path: '/api/unknown' });
        const next = (0, helpers_1.mockNext)();
        (0, notFound_1.notFound)(req, (0, helpers_1.mockRes)(), next);
        expect(next.mock.calls[0][0].message).toBe('Cannot POST /api/unknown');
    });
});
//# sourceMappingURL=notFound.test.js.map