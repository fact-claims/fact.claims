import crypto from 'crypto';

export function fingerprint(input: string): string {
  const hash = crypto.createHash('sha256');
  hash.update(input);
  return hash.digest('hex');
}
