import type { Request, Response, NextFunction } from 'express';
import type { AuthUser } from '../types/auth';

export function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  return {
    id: 'user-001',
    email: 'test@suwalka.in',
    roles: ['DSE'],
    tenantId: 'tenant-001',
    orgId: 'org-001',
    branchId: 'branch-001',
    requestId: 'req-001',
    ...overrides,
  };
}

export function encodeUserinfo(data: object): string {
  return Buffer.from(JSON.stringify(data)).toString('base64');
}

export function mockReq(overrides: Record<string, unknown> = {}): Request {
  return {
    headers: {},
    body: {},
    params: {},
    query: {},
    method: 'GET',
    path: '/test',
    ...overrides,
  } as unknown as Request;
}

export interface MockResponse extends Response {
  _status: number;
  _body: unknown;
}

export function mockRes(): MockResponse {
  const res = { _status: 200, _body: undefined } as unknown as MockResponse;
  (res as unknown as { status: jest.Mock }).status = jest.fn().mockImplementation((code: number) => {
    res._status = code;
    return res;
  });
  (res as unknown as { json: jest.Mock }).json = jest.fn().mockImplementation((data: unknown) => {
    res._body = data;
    return res;
  });
  return res;
}

export function mockNext(): jest.Mock<void, [unknown?]> {
  return jest.fn();
}
