"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.en = void 0;
exports.en = {
    // ── API error messages ──────────────────────────────────────────
    ERR_NOT_FOUND: 'Resource not found',
    ERR_VALIDATION: 'Invalid input',
    ERR_UNAUTHENTICATED: 'Authentication required',
    ERR_PERMISSION_DENIED: 'You do not have permission to perform this action',
    ERR_BRANCH_SCOPE_DENIED: 'Record is outside your branch scope',
    ERR_CONFLICT: 'Resource conflict',
    ERR_SERVER_ERROR: 'Internal server error',
    ERR_DEPENDENCY_ERROR: 'A dependency service failed or was unavailable',
    // ── Body-parser errors ──────────────────────────────────────────
    ERR_BODY_PARSE_FAILED: 'Invalid JSON body',
    ERR_BODY_TOO_LARGE: 'Request body too large',
    // ── Postgres constraint errors ──────────────────────────────────
    ERR_PG_UNIQUE: 'Duplicate value violates unique constraint',
    ERR_PG_FK: 'Referenced record does not exist',
    ERR_PG_NOT_NULL: 'This field is required and cannot be null',
    ERR_PG_CHECK: 'Value violates a database check constraint',
    // ── Success / informational ─────────────────────────────────────
    SUCCESS: 'OK',
};
//# sourceMappingURL=en.js.map