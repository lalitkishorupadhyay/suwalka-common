export declare class ServiceClient {
    protected readonly baseUrl: string;
    protected readonly requestId: string;
    constructor(baseUrl: string, requestId: string);
    protected buildHeaders(extra?: Record<string, string>): Record<string, string>;
    protected request<T>(method: string, path: string, body?: unknown, extra?: Record<string, string>): Promise<T>;
    protected get<T>(path: string, extra?: Record<string, string>): Promise<T>;
    protected post<T>(path: string, body: unknown, extra?: Record<string, string>): Promise<T>;
    protected patch<T>(path: string, body: unknown, extra?: Record<string, string>): Promise<T>;
}
//# sourceMappingURL=client.d.ts.map