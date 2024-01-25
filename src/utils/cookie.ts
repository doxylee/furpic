export function setCookie(name: string, value: any, expire: Date) {
  document.cookie = `${name}=${value};Expires=${expire.toUTCString()}`;
}

export function getCookie(name: string) {
  let value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return value ? value[2] : null;
}

export function delCookie(name: string) {
  document.cookie = `${name}=;Expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}
