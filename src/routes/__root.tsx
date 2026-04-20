import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { DevToolsBlock } from "@/components/DevToolsBlock";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="font-serif-elite text-7xl text-glow">404</h1>
        <p className="mt-4 text-muted-foreground tracking-[0.3em] uppercase text-xs">signal lost</p>
        <a href="/" className="inline-block mt-6 text-xs tracking-[0.3em] uppercase border border-white/20 px-4 py-2 hover:bg-white/5">return</a>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1" },
      { title: "lost.移动" },
      { name: "description", content: "underground cybersec collective" },
      { property: "og:title", content: "lost.移动" },
      { property: "og:description", content: "underground cybersec collective" },
      { property: "og:type", content: "website" },
      { name: "theme-color", content: "#000000" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: () => (
    <>
      <DevToolsBlock />
      <Outlet />
    </>
  ),
  notFoundComponent: NotFound,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
