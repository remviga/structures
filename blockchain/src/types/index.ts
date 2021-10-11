export interface DigestGenerator {
  encode(data: string): ArrayBuffer;
  digest(data: ArrayBuffer): Promise<string>;
}
