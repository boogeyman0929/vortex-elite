import { useState } from "react";
import { SoundOnIcon, SoundOffIcon } from "./Icon";
import { startAmbient, stopAmbient, click } from "@/lib/sound";

export const AmbientToggle = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => {
        click(440);
        if (on) { stopAmbient(); setOn(false); } else { startAmbient(); setOn(true); }
      }}
      className="glass hover:bg-white/10 transition-colors flex items-center gap-2 px-3 py-2 rounded-sm text-xs tracking-[0.3em] uppercase"
      aria-label="Toggle ambient sound"
    >
      {on ? <SoundOnIcon size={14} /> : <SoundOffIcon size={14} />}
      <span className="hidden sm:inline">{on ? "ambient" : "muted"}</span>
    </button>
  );
};
