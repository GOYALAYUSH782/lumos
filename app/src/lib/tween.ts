/** Eased value tween (easeOutCubic). Returns a cancel function. */
export function tween(
  from: number,
  to: number,
  duration: number,
  onUpdate: (v: number) => void,
  onDone?: () => void,
): () => void {
  const start = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  let raf = 0;
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration);
    onUpdate(from + (to - from) * ease(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else onDone?.();
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}
