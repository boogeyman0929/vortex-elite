import { useEffect } from "react";

const REDIRECT = "https://t.me/cybsexx";

export const DevToolsBlock = () => {
  useEffect(() => {
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(k)) ||
        (e.metaKey && e.altKey && ["i", "j", "c"].includes(k)) ||
        (e.ctrlKey && ["u", "s"].includes(k)) ||
        (e.metaKey && ["u", "s"].includes(k))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };
    window.addEventListener("contextmenu", onContext);
    window.addEventListener("keydown", onKey, true);

    let redirected = false;
    const redirect = () => {
      if (redirected) return;
      redirected = true;
      window.location.href = REDIRECT;
    };

    const interval = window.setInterval(() => {
      const threshold = 160;
      const wDiff = window.outerWidth - window.innerWidth;
      const hDiff = window.outerHeight - window.innerHeight;
      if (wDiff > threshold || hDiff > threshold) redirect();

      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const elapsed = performance.now() - start;
      if (elapsed > 100) redirect();
    }, 1000);

    return () => {
      window.removeEventListener("contextmenu", onContext);
      window.removeEventListener("keydown", onKey, true);
      window.clearInterval(interval);
    };
  }, []);

  return null;
};
