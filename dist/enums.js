"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordStatus = exports.Role = exports.ResponseCode = void 0;
exports.ResponseCode = {
    SUCCESS: 'SUCCESS',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    UNAUTHENTICATED: 'UNAUTHENTICATED',
    PERMISSION_DENIED: 'PERMISSION_DENIED',
    BRANCH_SCOPE_DENIED: 'BRANCH_SCOPE_DENIED',
    NOT_FOUND: 'NOT_FOUND',
    CONFLICT: 'CONFLICT',
    SERVER_ERROR: 'SERVER_ERROR',
    DEPENDENCY_ERROR: 'DEPENDENCY_ERROR',
};
exports.Role = {
    OWNER_GM: 'OWNER_GM',
    BSM_TL: 'BSM_TL',
    DSE: 'DSE',
    SERVICE_ADVISOR: 'SERVICE_ADVISOR',
    BACK_OFFICE: 'BACK_OFFICE',
};
exports.RecordStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    DELETED: 'DELETED',
};
//# sourceMappingURL=enums.js.map