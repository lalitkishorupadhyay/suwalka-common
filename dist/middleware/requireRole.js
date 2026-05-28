"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = requireRole;
const errors_1 = require("../errors");
function requireRole(...roles) {
    return (req, _res, next) => {
        const userRoles = req.user?.roles ?? [];
        const hasRole = roles.some(r => userRoles.includes(r));
        if (!hasRole) {
            next(new errors_1.PermissionDeniedError(`Requires one of: ${roles.join(', ')}`));
            return;
        }
        next();
    };
}
//# sourceMappingURL=requireRole.js.map