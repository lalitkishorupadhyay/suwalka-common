"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const errors_1 = require("../errors");
class TestClient extends client_1.ServiceClient {
    headers(extra) { return this.buildHeaders(extra); }
    callGet(path, extra) { return this.get(path, extra); }
    callPost(path, body, extra) { return this.post(path, body, extra); }
    callPatch(path, body, extra) { return this.patch(path, body, extra); }
    callRequest(method, path, body, extra) {
        return this.request(method, path, body, extra);
    }
}
const BASE = 'http://platform-svc';
const REQ_ID = 'req-abc';
function makeOkResponse(data) {
    return {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(data),
    };
}
function makeErrorResponse(status, jsonFn) {
    return {
        ok: false,
        status,
        json: jest.fn().mockImplementation(jsonFn ?? (() => Promise.resolve({ error: 1 }))),
    };
}
describe('ServiceClient', () => {
    let client;
    let fetchSpy;
    beforeEach(() => {
        client = new TestClient(BASE, REQ_ID);
        fetchSpy = jest.spyOn(global, 'fetch');
    });
    afterEach(() => {
        fetchSpy.mockRestore();
    });
    describe('constructor', () => {
        it('stores baseUrl without trailing slash', () => {
            const c = new TestClient('http://svc/', REQ_ID);
            const headers = c.headers();
            expect(headers['X-Request-Id']).toBe(REQ_ID);
        });
        it('keeps baseUrl when no trailing slash', () => {
            const c = new TestClient('http://svc', REQ_ID);
            fetchSpy.mockResolvedValueOnce(makeOkResponse({ ok: true }));
            return expect(c.callGet('/path')).resolves.toEqual({ ok: true });
        });
    });
    describe('buildHeaders', () => {
        it('returns base headers without extra', () => {
            const h = client.headers();
            expect(h).toEqual({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Request-Id': REQ_ID,
            });
        });
        it('merges extra headers', () => {
            const h = client.headers({ 'X-Tenant-Id': 'tenant-1' });
            expect(h['X-Tenant-Id']).toBe('tenant-1');
            expect(h['X-Request-Id']).toBe(REQ_ID);
        });
    });
    describe('request — success', () => {
        it('GET without body returns parsed JSON', async () => {
            fetchSpy.mockResolvedValueOnce(makeOkResponse({ id: '1' }));
            const result = await client.callGet('/employees/1');
            expect(result).toEqual({ id: '1' });
            expect(fetchSpy).toHaveBeenCalledWith(`${BASE}/employees/1`, expect.objectContaining({ method: 'GET', body: undefined }));
        });
        it('POST with body serialises it as JSON', async () => {
            fetchSpy.mockResolvedValueOnce(makeOkResponse({ id: '2' }));
            await client.callPost('/employees', { name: 'Ravi' });
            expect(fetchSpy).toHaveBeenCalledWith(`${BASE}/employees`, expect.objectContaining({ method: 'POST', body: JSON.stringify({ name: 'Ravi' }) }));
        });
        it('PATCH works', async () => {
            fetchSpy.mockResolvedValueOnce(makeOkResponse({ id: '3' }));
            const result = await client.callPatch('/employees/3', { status: 'INACTIVE' });
            expect(result).toEqual({ id: '3' });
        });
    });
    describe('request — network error', () => {
        it('throws DependencyError (503) when fetch rejects with an Error', async () => {
            fetchSpy.mockRejectedValueOnce(new Error('ECONNREFUSED'));
            const err = await client.callGet('/path').catch(e => e);
            expect(err).toBeInstanceOf(errors_1.DependencyError);
            expect(err.statusCode).toBe(503);
            expect(err.message).toContain('ECONNREFUSED');
        });
        it('throws DependencyError (503) when fetch rejects with a non-Error value', async () => {
            fetchSpy.mockRejectedValueOnce('timeout string');
            const err = await client.callGet('/path').catch(e => e);
            expect(err).toBeInstanceOf(errors_1.DependencyError);
            expect(err.statusCode).toBe(503);
            expect(err.message).toContain('timeout string');
        });
    });
    describe('request — non-ok HTTP response', () => {
        it('throws DependencyError (503) for a 503 response with parseable body', async () => {
            fetchSpy.mockResolvedValueOnce(makeErrorResponse(503));
            await expect(client.callGet('/path')).rejects.toMatchObject({
                code: 'DEPENDENCY_ERROR',
                statusCode: 503,
            });
        });
        it('throws DependencyError (502) for other non-ok responses', async () => {
            fetchSpy.mockResolvedValueOnce(makeErrorResponse(404));
            await expect(client.callGet('/path')).rejects.toMatchObject({
                code: 'DEPENDENCY_ERROR',
                statusCode: 502,
            });
        });
        it('sets errorBody to null when response.json() throws on a non-ok response', async () => {
            fetchSpy.mockResolvedValueOnce(makeErrorResponse(500, () => Promise.reject(new Error('not json'))));
            const err = await client.callGet('/path').catch(e => e);
            expect(err).toBeInstanceOf(errors_1.DependencyError);
            expect(err.details).toBeNull();
        });
    });
});
//# sourceMappingURL=client.test.js.map