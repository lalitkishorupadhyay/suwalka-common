import { DependencyError } from './errors';

export class ServiceClient {
  protected readonly baseUrl: string;
  protected readonly requestId: string;

  constructor(baseUrl: string, requestId: string) {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.requestId = requestId;
  }

  protected buildHeaders(extra?: Record<string, string>): Record<string, string> {
    return { 'Content-Type': 'application/json', Accept: 'application/json', 'X-Request-Id': this.requestId, ...extra };
  }

  protected async request<T>(method: string, path: string, body?: unknown, extra?: Record<string, string>): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    let response: Response;
    try {
      response = await fetch(url, { method, headers: this.buildHeaders(extra), body: body !== undefined ? JSON.stringify(body) : undefined });
    } catch (err) {
      throw new DependencyError(`Dependency unreachable at ${url}: ${err instanceof Error ? err.message : String(err)}`, 503);
    }
    if (!response.ok) {
      let errorBody: unknown;
      try { errorBody = await response.json(); } catch { errorBody = null; }
      throw new DependencyError(`Dependency responded ${response.status} for ${method} ${url}`, response.status === 503 ? 503 : 502, errorBody);
    }
    return response.json() as Promise<T>;
  }

  protected get<T>(path: string, extra?: Record<string, string>): Promise<T> { return this.request<T>('GET', path, undefined, extra); }
  protected post<T>(path: string, body: unknown, extra?: Record<string, string>): Promise<T> { return this.request<T>('POST', path, body, extra); }
  protected patch<T>(path: string, body: unknown, extra?: Record<string, string>): Promise<T> { return this.request<T>('PATCH', path, body, extra); }
}
