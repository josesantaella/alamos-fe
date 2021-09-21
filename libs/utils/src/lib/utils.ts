import { decode } from 'blurhash';
import UPNG from 'upng-js';
import { encode as encode64 } from 'base64-arraybuffer';

export function blurHashToBase64(blurHash: string): string {
  const pixels = decode(blurHash, 32, 32);
  const png = UPNG.encode([pixels], 32, 32, 256);
  return 'data:image/png;base64,' + encode64(png);
}
