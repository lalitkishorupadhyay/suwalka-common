"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeUser = makeUser;
exports.encodeUserinfo = encodeUserinfo;
exports.mockReq = mockReq;
exports.mockRes = mockRes;
exports.mockNext = mockNext;
function makeUser(overrides = {}) {
    return {
        id: 'user-001',
        email: 'test@suwalka.in',
        roles: ['DSE'],
        tenantId: 'tenant-001',
        branchId: 'branch-001',
        requestId: 'req-001',
        ...overrides,
    };
}
function encodeUserinfo(data) {
    return Buffer.from(JSON.stringify(data)).toString('base64');
}
function mockReq(overrides = {}) {
    return {
        headers: {},
        body: {},
        params: {},
        query: {},
        method: 'GET',
        path: '/test',
        ...overrides,
    };
}
function mockRes() {
    const res = { _status: 200, _body: undefined };
    res.status = jest.fn().mockImplementation((code) => {
        res._status = code;
        return res;
    });
    res.json = jest.fn().mockImplementation((data) => {
        res._body = data;
        return res;
    });
    return res;
}
function mockNext() {
    return jest.fn();
}
//# sourceMappingURL=helpers.js.map