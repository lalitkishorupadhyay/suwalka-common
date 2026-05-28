"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
const errors_1 = require("../errors");
function notFound(req, _res, next) {
    next(new errors_1.NotFoundError(`Cannot ${req.method} ${req.path}`));
}
//# sourceMappingURL=notFound.js.map