const BASE_URL = 'https://vently-backend.tae5609.site/api';

async function request<T>(
    endpoint: string,
    options: RequestInit = {},
    accessToken?: string | null
): Promise<T> {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
    };

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const error_text = await response.text();
        throw new Error(`API Error ${response.status}: ${error_text}`);
    }

    return response.json() as Promise<T>;
}

export const api = {
    get: <T>(endpoint: string, accessToken?: string | null) =>
        request<T>(endpoint, { method: 'GET' }, accessToken),

    post: <T>(endpoint: string, body: unknown, accessToken?: string | null) =>
        request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        }, accessToken),

    put: <T>(endpoint: string, body: unknown, accessToken?: string | null) =>
        request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        }, accessToken),

    delete: <T>(endpoint: string, accessToken?: string | null) =>
        request<T>(endpoint, { method: 'DELETE' }, accessToken),
};
