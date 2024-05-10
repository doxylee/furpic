export type Param = string | string[] | undefined;

export function getFirst(s: string | string[]): string;
export function getFirst(s: string | string[] | undefined): string | undefined;
export function getFirst(s: string | string[] | undefined): string | undefined {
  if (Array.isArray(s)) return s[0];
  return s;
}

export function getFirstInt(s: string | string[] | undefined) {
  if (Array.isArray(s)) return parseInt(s[0]);
  if (s) return parseInt(s);
  return undefined;
}

export function getCommaList<T extends string>(
  s: string | string[] | undefined,
) {
  if (Array.isArray(s)) return s[0].split(",").map((s) => s.trim()) as T[];
  if (s) return s.split(",").map((s) => s.trim()) as T[];
  return undefined;
}
