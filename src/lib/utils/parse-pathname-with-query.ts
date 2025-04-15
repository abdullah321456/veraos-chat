// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parsePathnameWithQuery(pathname: string, query: Record<string, any>) {
  const queryString = new URLSearchParams(query).toString();
  return pathname + (queryString ? `?${queryString}` : '');
}
