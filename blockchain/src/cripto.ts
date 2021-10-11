import { DigestGenerator } from "./types/index";

export class BrowserCryptoGenerator implements DigestGenerator {
  encode(data: string) {
    const encoder = new TextEncoder();

    const encodedData = encoder.encode(data);

    return encodedData;
  }

  async digest(data: ArrayBuffer) {
    const hash = await crypto.subtle.digest("SHA-256", data);

    const hashArray = Array.from(new Uint8Array(hash));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return hashHex;
  }
}
