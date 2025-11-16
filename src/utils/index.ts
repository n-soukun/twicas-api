export function toBase64(str: string) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    // Browser
    return window.btoa(unescape(encodeURIComponent(str)));
  } else {
    // Node.js
    return Buffer.from(str, "utf8").toString("base64");
  }
}

export function setSearchParams(
  origUrl: URL,
  params: Record<string, any> | undefined
): URL {
  const url = new URL(origUrl.toString());
  Object.entries(params ?? {}).forEach(([k, v]) => {
    if (v === undefined) return;
    if (Array.isArray(v))
      v.forEach((item) => url.searchParams.append(k, String(item)));
    else url.searchParams.append(k, String(v));
  });
  return url;
}
