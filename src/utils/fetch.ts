import clientSettings from "clientSettings";

export async function fetchAPI({
  method,
  path,
  query,
  body,
}: {
  method: string;
  path: string;
  query?: Record<string, any>;
  body?: Record<string, any> | FormData;
}) {
  try {
    const queryString = query
      ? "?" +
        Object.entries(query)
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => `${key}=${value}`)
          .join("&")
      : "";
    const res = await fetch(
      `${clientSettings.BACKEND_URL}/${path}${queryString}`,
      {
        method,
        body:
          body instanceof FormData
            ? body
            : body
              ? JSON.stringify(body)
              : undefined,
        credentials: "include",
        cache: "no-cache", // TODO: Allow cache for short time
      },
    );
    if (res.status >= 400) throw new FetchError(await res.json(), res.status);
    return res.json();
  } catch (e) {
    throw e;
  }
}

export class FetchError extends Error {
  error?: string;
  constructor(
    payload: { statusCode: number; message: string; error?: string },
    public status: number,
  ) {
    super(payload.message);
    this.name = "FetchError";
    this.error = payload.error;
  }
}
