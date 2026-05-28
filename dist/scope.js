"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveListScope = resolveListScope;
exports.assertBranchInScope = assertBranchInScope;
const errors_1 = require("./errors");
function resolveListScope(user, requestedBranchId) {
    if (requestedBranchId !== undefined && requestedBranchId !== user.branchId) {
        throw new errors_1.BranchScopeDeniedError('Requested branch_id is outside your branch scope');
    }
    return { branchId: user.branchId };
}
function assertBranchInScope(req, recordBranchId) {
    if (!req.user)
        throw new errors_1.UnauthenticatedError('User context is missing');
    if (req.user.branchId !== recordBranchId)
        throw new errors_1.BranchScopeDeniedError('Record is outside your branch scope');
}
//# sourceMappingURL=scope.js.map