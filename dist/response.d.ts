import type { Response } from 'express';
export interface CollectionOptions<T> {
    results: T[];
    page: number;
    total?: number;
}
export declare function sendRecord<T>(res: Response, result: T, statusCode?: number): void;
export declare function sendCollection<T>(res: Response, options: CollectionOptions<T>): void;
//# sourceMappingURL=response.d.ts.map