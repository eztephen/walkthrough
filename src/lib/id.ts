let seq = 0;

// crypto.randomUUID() is unavailable over plain http on a LAN address, which is exactly
// how the demo gets opened on a phone during development — so use a local counter.
export function nextId(prefix: string): string {
  seq += 1;
  return `${prefix}-${Date.now().toString(36)}-${seq.toString(36)}`;
}
