import { useEffect, useRef, useState, type ReactNode } from "react";
import { cx } from "@/lib/format";

/** Fade-up no scroll, sem dependência externa. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cx("reveal", seen && "in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
  tone = "light",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "light" | "sand" | "dark";
}) {
  const tones = {
    light: "bg-sand-50 text-ink",
    sand: "bg-sand-100 text-ink",
    dark: "bg-clay-900 text-sand-100",
  };
  return (
    <section id={id} className={cx("py-20 sm:py-28", tones[tone], className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <span className="rule" />
      <span className="eyebrow text-clay-400">{children}</span>
    </div>
  );
}

/** Título de seção com quebras de linha respeitadas. */
export function Title({ children, className }: { children: string; className?: string }) {
  return (
    <h2 className={cx("display text-[2.1rem] sm:text-5xl whitespace-pre-line", className)}>{children}</h2>
  );
}

export function Stat({ valor, label }: { valor: ReactNode; label: string }) {
  return (
    <div>
      <div className="display text-4xl sm:text-5xl text-clay-600">{valor}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-ink/50">{label}</div>
    </div>
  );
}

/** <img> com dimensões declaradas: sem reflow, sem CLS. */
export function Img({
  foto,
  alt = "",
  className,
  priority = false,
  sizes,
}: {
  foto: { src: string; w: number; h: number };
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <img
      src={foto.src}
      width={foto.w}
      height={foto.h}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={className}
    />
  );
}
