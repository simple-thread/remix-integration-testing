export function timerString(time: number): string {
  if (!time) return "00:00";
  return new Date(time * 1000).toISOString().slice(14, 19);
}
