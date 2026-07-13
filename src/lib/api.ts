class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status = 500, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiClient {
  baseUrl: string;

  constructor(baseUrl?: string) {
    // Vite exposes env vars under import.meta.env
    // fallback to provided baseUrl or empty string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const envBase = (typeof import.meta !== 'undefined' ? (import.meta as any).env?.VITE_API_BASE_URL : undefined) as string | undefined;
    this.baseUrl = baseUrl ?? envBase ?? '';
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const url = this.baseUrl ? `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}` : path;
    let res: Response;
    try {
      res = await fetch(url, init);
    } catch (err) {
      throw new ApiError('Network request failed', 0, err);
    }

    const text = await res.text();
    const contentType = res.headers.get('content-type') || '';
    let body: unknown = text;
    if (contentType.includes('application/json') && text) {
      try {
        body = JSON.parse(text);
      } catch (err) {
        throw new ApiError('Invalid JSON response', res.status, err);
      }
    }

    if (!res.ok) {
      throw new ApiError(typeof body === 'string' ? body : 'API error', res.status, body);
    }

    return body as T;
  }

  get<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'GET' });
  }

  post<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put<T>(path: string, data?: unknown): Promise<T> {
    return this.request<T>(path, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

export { ApiError };
