"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const errors_1 = require("../errors");
function flattenZodError(error, prefix) {
    return error.errors.map(i => ({ field: i.path.length > 0 ? i.path.join('.') : prefix, message: i.message }));
}
function validate(schemas) {
    return (req, _res, next) => {
        const fieldErrors = [];
        if (schemas.body) {
            const r = schemas.body.safeParse(req.body);
            if (!r.success)
                fieldErrors.push(...flattenZodError(r.error, 'body'));
            else
                req.body = r.data;
        }
        if (schemas.params) {
            const r = schemas.params.safeParse(req.params);
            if (!r.success)
                fieldErrors.push(...flattenZodError(r.error, 'params'));
            else
                req.params = r.data;
        }
        if (schemas.query) {
            const r = schemas.query.safeParse(req.query);
            if (!r.success)
                fieldErrors.push(...flattenZodError(r.error, 'query'));
            else
                req.query = r.data;
        }
        if (fieldErrors.length > 0) {
            next(new errors_1.ValidationError('Invalid Input', fieldErrors));
            return;
        }
        next();
    };
}
//# sourceMappingURL=validate.js.map