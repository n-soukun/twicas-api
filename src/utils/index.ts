export function toBase64(str: string) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    // Browser
    return window.btoa(unescape(encodeURIComponent(str)));
  } else {
    // Node.js
    return Buffer.from(str, "utf8").toString("base64");
  }
}
