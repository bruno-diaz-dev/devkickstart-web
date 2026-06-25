const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5119";

type ApiRequestOptions = RequestInit & {
  token?: string | null;
};

export function apiUrl(path: string) {
  return new URL(path, API_BASE_URL).toString();
}

export function apiRequest(
  path: string,
  { token, headers, ...options }: ApiRequestOptions = {}
) {
  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  return fetch(apiUrl(path), {
    ...options,
    headers: requestHeaders,
  });
}
