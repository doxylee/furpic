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
        cache: "no-cache",
      },
    );
    if (res.status >= 400) throw new FetchError(await res.text(), res.status);
    return res.json();
  } catch (e) {
    throw e;
  }
}

export class FetchError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}
