"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRecord = sendRecord;
exports.sendCollection = sendCollection;
const http_status_codes_1 = require("http-status-codes");
const i18n_1 = require("./i18n");
function sendRecord(res, result, statusCode = http_status_codes_1.StatusCodes.OK) {
    res.status(statusCode).json({ error: 0, code: 'SUCCESS', message: (0, i18n_1.t)('SUCCESS'), result });
}
function sendCollection(res, options) {
    const body = {
        error: 0, code: 'SUCCESS', message: (0, i18n_1.t)('SUCCESS'),
        page: options.page, results: options.results,
    };
    if (options.total !== undefined)
        body.total_records = options.total;
    res.status(http_status_codes_1.StatusCodes.OK).json(body);
}
//# sourceMappingURL=response.js.map