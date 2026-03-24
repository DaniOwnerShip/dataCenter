const fallbackApiUrl = "http://localhost:3001";

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || fallbackApiUrl;
}

export function getApiToken(): string {
  return process.env.NEXT_PUBLIC_SERVER_AUTH_TOKEN?.trim() || "";
}

export function getAuthHeaders(): HeadersInit {
  const token = getApiToken();
  if (!token) return {};
  return {
    Authorization: `Bearer ${token}`,
  };
}
