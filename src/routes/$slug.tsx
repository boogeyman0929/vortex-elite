import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { team, type Member } from "@/data/team";
import { ArrowLeftIcon, TelegramIcon, ShieldIcon, SparkIcon } from "@/components/Icon";
import { click } from "@/lib/sound";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const member = team.find((m) => m.slug === params.slug);
    if (!member) throw notFound();
    return { member };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.member.name ?? "lost"} · lost.移动` },
      { name: "description", content: loaderData?.member.tagline ?? "" },
      { property: "og:title", content: `${loaderData?.member.name ?? "lost"} · lost.移动` },
      { property: "og:description", content: loaderData?.member.tagline ?? "" },
    ],
  }),
  component: Profile,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="font-serif-elite text-3xl text-glow">vessel not found</p>
        <Link to="/" className="inline-block mt-6 text-xs tracking-[0.3em] uppercase border border-white/20 px-4 py-2 hover:bg-white/5">return</Link>
      </div>
    </div>
  ),
});

function Profile() {
  const { member } = Route.useLoaderData() as { member: Member };
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    const items = el.querySelectorAll("[data-stagger]");
    gsap.fromTo(items, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 0.2, ease: "power2.out" });
  }, []);

  const goBack = () => {
    click(440);
    const el = containerRef.current;
    if (!el) { navigate({ to: "/" }); return; }
    gsap.to(el, { opacity: 0, y: 10, duration: 0.4, ease: "power2.in", onComplete: () => navigate({ to: "/" }) });
  };

  const handleTelegram = (e: React.MouseEvent) => {
    click(660);
    if (e.shiftKey || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    navigator.clipboard?.writeText(member.telegram).catch(() => undefined);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
    window.open(member.telegram, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen relative bg-background overflow-hidden">
      <div className="cloud-bg" />
      <div className="fixed inset-0 scanline pointer-events-none z-[1]" />

      <button
        onClick={goBack}
        className="fixed top-6 left-6 z-50 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground hover:text-white transition-colors group"
      >
        <ArrowLeftIcon size={14} className="group-hover:-translate-x-1 transition-transform" />
        return
      </button>

      <div className="fixed top-6 right-6 z-50 flex items-center gap-3 text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        <span className="font-serif-elite text-glow text-white/80">lost.移动</span>
      </div>

      <div ref={containerRef} className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-16 pt-24 pb-16 max-w-[1600px] mx-auto">

        <div className="lg:sticky lg:top-24 self-start" data-stagger>
          <div className="relative aspect-[3/4] max-w-md mx-auto">
            <div className="absolute -inset-4 border border-white/10" />
            <div className="absolute -inset-2 border border-white/5" />
            <div className="relative w-full h-full overflow-hidden glass box-glow-strong">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 text-[9px] tracking-[0.3em] uppercase opacity-60">vessel · {member.slug}</div>
              <div className="absolute bottom-3 right-3 text-[9px] tracking-[0.3em] uppercase opacity-60">↦ active</div>
            </div>
          </div>
        </div>

        <div className="lg:max-h-screen lg:overflow-y-auto scrollbar-thin lg:pr-6 space-y-12">
          <div data-stagger>
            <div className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-4">profile · 0{team.findIndex(t => t.slug === member.slug) + 1}</div>
            <h1 className="font-serif-elite text-7xl md:text-9xl uppercase text-glow leading-none">{member.name}</h1>
            <p className="font-script italic text-2xl md:text-3xl text-white/50 mt-4">{member.tagline}</p>
          </div>

          <section data-stagger>
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-white/30" />
              links
            </h2>
            <a
              href={member.telegram}
              onClick={handleTelegram}
              className="glass inline-flex items-center gap-3 px-5 py-3 hover:bg-white/10 transition-all group"
            >
              <TelegramIcon size={16} />
              <span className="text-xs tracking-[0.3em] uppercase">{copied ? "link copied" : "telegram"}</span>
              <span className="text-[10px] text-muted-foreground tracking-widest group-hover:text-white/70 transition-colors">→</span>
            </a>
          </section>

          <section data-stagger>
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-4 flex items-center gap-3">
              <span className="w-6 h-px bg-white/30" />
              interests
            </h2>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono-hacker text-sm text-white/80">
              {member.interests.map((it, i) => (
                <span key={it} className="flex items-center gap-3">
                  <span className="lowercase">{it}</span>
                  {i < member.interests.length - 1 && <SparkIcon size={10} className="text-white/40" />}
                </span>
              ))}
            </div>
          </section>

          <section data-stagger>
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-muted-foreground mb-6 flex items-center gap-3">
              <span className="w-6 h-px bg-white/30" />
              achievements
            </h2>
            <div className="space-y-3">
              {member.achievements.map((a, i) => (
                <div key={a} className="glass group hover:bg-white/[0.06] transition-colors p-4 flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors">
                    <ShieldIcon size={16} className="text-white/70" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[9px] tracking-[0.4em] uppercase text-muted-foreground mb-1">badge · 0{i + 1}</div>
                    <p className="text-sm text-white/85 leading-relaxed">{a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section data-stagger className="pt-8 border-t border-white/10">
            <p className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">end of transmission</p>
          </section>
        </div>
      </div>
    </div>
  );
}
