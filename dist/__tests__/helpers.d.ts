import type { Request, Response } from 'express';
import type { AuthUser } from '../types/auth';
export declare function makeUser(overrides?: Partial<AuthUser>): AuthUser;
export declare function encodeUserinfo(data: object): string;
export declare function mockReq(overrides?: Record<string, unknown>): Request;
export interface MockResponse extends Response {
    _status: number;
    _body: unknown;
}
export declare function mockRes(): MockResponse;
export declare function mockNext(): jest.Mock<void, [unknown?]>;
//# sourceMappingURL=helpers.d.ts.map