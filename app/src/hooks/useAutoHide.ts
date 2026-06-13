import { useEffect, useState } from "react";

/**
 * Reveals UI on any pointer/key activity, hides it after `delay` ms of idle.
 * Also hides the cursor when idle so a bare light field feels like an appliance.
 */
export function useAutoHide(delay = 3500) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timer: number | undefined;

    const poke = () => {
      setVisible(true);
      document.body.style.cursor = "";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setVisible(false);
        document.body.style.cursor = "none";
      }, delay);
    };

    const events: (keyof WindowEventMap)[] = ["mousemove", "mousedown", "keydown", "touchstart"];
    events.forEach((e) => window.addEventListener(e, poke, { passive: true }));
    poke();

    return () => {
      window.clearTimeout(timer);
      document.body.style.cursor = "";
      events.forEach((e) => window.removeEventListener(e, poke));
    };
  }, [delay]);

  return visible;
}
