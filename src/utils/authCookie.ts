import { cookies } from "next/headers";

export function getAuthCookies() {
  const cookieStore = cookies();
  const access = cookieStore.get("access");
  const refresh = cookieStore.get("refresh");
  if (access && refresh)
    return `access=${access.value}; refresh=${refresh.value}`;
  if (refresh) return `refresh=${refresh.value}`;
  return undefined;
}
