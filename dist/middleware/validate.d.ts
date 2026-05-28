import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
interface ValidateSchemas {
    body?: ZodSchema;
    params?: ZodSchema;
    query?: ZodSchema;
}
export declare function validate(schemas: ValidateSchemas): (req: Request, _res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=validate.d.ts.map