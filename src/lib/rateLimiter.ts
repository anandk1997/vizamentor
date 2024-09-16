const rateLimits = new Map();

const RATE_LIMIT = 100;
const TIME_WINDOW = 5 * 60 * 1000;

export function checkRateLimit(ip: string) {
  const currentTime = Date.now();

  if (!rateLimits.has(ip)) {
    rateLimits.set(ip, { count: 1, startTime: currentTime });
    return true;
  }

  const { count, startTime } = rateLimits.get(ip);

  if (currentTime - startTime > TIME_WINDOW) {
    rateLimits.set(ip, { count: 1, startTime: currentTime });
    return true;
  }

  if (count >= RATE_LIMIT) return false;

  rateLimits.set(ip, { count: count + 1, startTime });
  return true;
}
