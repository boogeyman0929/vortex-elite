import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "@tanstack/react-router";
import { team } from "@/data/team";
import { click } from "@/lib/sound";

export const Vortex = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    const tween = gsap.to(group, {
      rotationY: 360,
      duration: 28,
      repeat: -1,
      ease: "none",
      transformOrigin: "50% 50%",
    });
    return () => { tween.kill(); };
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * -10;
      gsap.to(scene, { rotationY: x, rotationX: y, duration: 1.2, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const radius = 320;

  return (
    <div className="vortex-container" style={{ position: "fixed", inset: 0, perspective: "1400px", zIndex: 10 }}>
      <div
        ref={sceneRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          ref={groupRef}
          style={{
            position: "absolute",
            inset: 0,
            transformStyle: "preserve-3d",
            top: "50%",
            left: "50%",
          }}
        >
          {team.map((m, i) => {
            const angle = (i / team.length) * 360;
            return (
              <button
                key={m.slug}
                onClick={() => {
                  click(660);
                  navigate({ to: "/$slug", params: { slug: m.slug } });
                }}
                onMouseEnter={() => click(1200, 0.03)}
                className="group"
                style={{
                  position: "absolute",
                  width: 200,
                  height: 300,
                  left: -100,
                  top: -150,
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  cursor: "pointer",
                  background: "transparent",
                  border: "none",
                  padding: 0,
                }}
              >
                <div
                  className="glass box-glow group-hover:box-glow-strong transition-all duration-500 group-hover:scale-105"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 4,
                    overflow: "hidden",
                    position: "relative",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="grayscale group-hover:grayscale-0 transition-all duration-700"
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, transparent 50%, oklch(0 0 0 / 0.95) 100%)",
                    }}
                  />
                  <div
                    className="font-serif-elite text-glow"
                    style={{
                      position: "absolute",
                      bottom: 16,
                      left: 0,
                      right: 0,
                      textAlign: "center",
                      letterSpacing: "0.4em",
                      fontSize: 22,
                      textTransform: "uppercase",
                      color: "white",
                    }}
                  >
                    {m.name}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      left: 8,
                      fontSize: 9,
                      letterSpacing: "0.3em",
                      opacity: 0.5,
                    }}
                  >
                    0{ String(i + 1).padStart(2, "0") }
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
