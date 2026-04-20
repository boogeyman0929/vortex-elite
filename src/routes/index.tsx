import { createFileRoute } from "@tanstack/react-router";
import { Vortex } from "@/components/Vortex";
import { AmbientToggle } from "@/components/AmbientToggle";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <div className="cloud-bg" />
      <div className="fixed inset-0 scanline pointer-events-none z-[1]" />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          <span className="font-serif-elite text-lg tracking-[0.4em] text-glow">lost.移动</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
          <span>collective</span>
          <span className="text-white/60">est. mmxxiii</span>
        </div>
        <AmbientToggle />
      </header>

      <Vortex />

      <div className="fixed left-1/2 -translate-x-1/2 bottom-24 z-40 text-center pointer-events-none">
        <div className="font-script text-5xl md:text-7xl text-white/90 text-glow leading-none">lost</div>
        <div className="mt-2 text-[10px] tracking-[0.6em] uppercase text-muted-foreground">underground · cybersec · collective</div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>// click a vessel to enter</span>
        <span className="hidden md:inline">no logs · no traces</span>
        <span>v1.0.0</span>
      </footer>
    </div>
  );
}
