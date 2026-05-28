"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readUser = readUser;
const errors_1 = require("../errors");
const pick = (h) => typeof h === 'string' ? h : Array.isArray(h) ? h[0] : '';
function readUser(req, res, next) {
    const raw = req.headers['x-userinfo'];
    if (!raw || typeof raw !== 'string') {
        next(new errors_1.UnauthenticatedError('Missing X-Userinfo header'));
        return;
    }
    let info;
    try {
        const parsed = JSON.parse(Buffer.from(raw, 'base64').toString('utf-8'));
        if (typeof parsed !== 'object' || parsed === null)
            throw new Error();
        info = parsed;
    }
    catch {
        next(new errors_1.UnauthenticatedError('X-Userinfo header is malformed'));
        return;
    }
    if (!info.sub || typeof info.sub !== 'string') {
        next(new errors_1.UnauthenticatedError('X-Userinfo missing sub'));
        return;
    }
    const user = {
        id: info.sub,
        email: typeof info.email === 'string' ? info.email : '',
        roles: Array.isArray(info.roles) ? info.roles : [],
        tenantId: pick(req.headers['x-tenant-id']),
        orgId: pick(req.headers['x-org-id']),
        branchId: pick(req.headers['x-branch-id']),
        requestId: pick(req.headers['x-request-id']),
    };
    req.user = user;
    req.requestId = user.requestId;
    next();
}
//# sourceMappingURL=readUser.js.map