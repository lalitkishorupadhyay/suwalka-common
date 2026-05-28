"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const http_status_codes_1 = require("http-status-codes");
const errors_1 = require("../errors");
const i18n_1 = require("../i18n");
function errorHandler(err, req, res, _next) {
    const requestId = req.requestId ?? req.headers['x-request-id'] ?? 'unknown';
    console.error(JSON.stringify({ level: 'error', requestId, error: err instanceof Error ? { name: err.name, message: err.message } : err }));
    // Body-parser errors: malformed JSON or payload too large
    if (err instanceof Error && err.type === 'entity.parse.failed') {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 1, code: 'VALIDATION_ERROR', message: (0, i18n_1.t)('ERR_BODY_PARSE_FAILED') });
        return;
    }
    if (err instanceof Error && err.type === 'entity.too.large') {
        res.status(http_status_codes_1.StatusCodes.REQUEST_TOO_LONG).json({ error: 1, code: 'VALIDATION_ERROR', message: (0, i18n_1.t)('ERR_BODY_TOO_LARGE') });
        return;
    }
    if (err instanceof errors_1.ValidationError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({ error: 1, code: err.code, message: err.message, errors: err.fieldErrors });
        return;
    }
    if (err instanceof errors_1.ApiError) {
        res.status(err.statusCode).json({ error: 1, code: err.code, message: err.message });
        return;
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 1, code: 'SERVER_ERROR', message: (0, i18n_1.t)('ERR_SERVER_ERROR') });
}
//# sourceMappingURL=errorHandler.js.map