"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClient = void 0;
const errors_1 = require("./errors");
class ServiceClient {
    baseUrl;
    requestId;
    constructor(baseUrl, requestId) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.requestId = requestId;
    }
    buildHeaders(extra) {
        return { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Request-Id': this.requestId, ...extra };
    }
    async request(method, path, body, extra) {
        const url = `${this.baseUrl}${path}`;
        let response;
        try {
            response = await fetch(url, { method, headers: this.buildHeaders(extra), body: body !== undefined ? JSON.stringify(body) : undefined });
        }
        catch (err) {
            throw new errors_1.DependencyError(`Dependency unreachable at ${url}: ${err instanceof Error ? err.message : String(err)}`, 503);
        }
        if (!response.ok) {
            let errorBody;
            try {
                errorBody = await response.json();
            }
            catch {
                errorBody = null;
            }
            throw new errors_1.DependencyError(`Dependency responded ${response.status} for ${method} ${url}`, response.status === 503 ? 503 : 502, errorBody);
        }
        return response.json();
    }
    get(path, extra) { return this.request('GET', path, undefined, extra); }
    post(path, body, extra) { return this.request('POST', path, body, extra); }
    patch(path, body, extra) { return this.request('PATCH', path, body, extra); }
}
exports.ServiceClient = ServiceClient;
//# sourceMappingURL=client.js.map