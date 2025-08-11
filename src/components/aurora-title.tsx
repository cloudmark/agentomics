"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function AuroraTitle({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        "aurora-holder relative w-full flex items-center justify-center",
        className
      )}
      style={{ minHeight: "8rem" }} // SSR-safe space reservation
    >
      <h1
        className="aurora-wrap font-headline font-extrabold leading-none tracking-tight text-center"
        aria-label={text}
      >
        <span className="sr-only">{text}</span>
        <span
          className="aurora-mask"
          aria-hidden="true"
          data-text={text}
          style={{
            backgroundImage:
              resolvedTheme === "dark"
                ? `radial-gradient(60% 140% at 15% 15%, hsl(var(--primary) / 0.95) 0 42%, transparent 72%), radial-gradient(60% 140% at 85% 15%, #33ff8c 0 40%, transparent 72%), radial-gradient(80% 160% at 25% 85%, #ffc640 0 38%, transparent 72%), radial-gradient(80% 160% at 75% 75%, #7c3aed 0 40%, transparent 72%), linear-gradient(hsl(var(--foreground)), hsl(var(--foreground)))`
                : `radial-gradient(80% 120% at 50% 20%, hsl(0 0% 5%) 0 50%, transparent 80%), radial-gradient(90% 130% at 20% 50%, hsl(220 100% 20%) 0 50%, transparent 80%), radial-gradient(85% 125% at 80% 30%, hsl(0 0% 0%) 0 50%, transparent 80%), radial-gradient(75% 115% at 30% 70%, hsl(0 0% 10%) 0 50%, transparent 80%), linear-gradient(hsl(var(--foreground)), hsl(var(--foreground)))`,
          }}
        />
      </h1>

      <style jsx>{`
        .aurora-holder {
          --fs: clamp(3rem, 10vw, 9rem);
          min-height: calc(var(--fs) * 1.3);
        }

        .aurora-wrap {
          font-size: var(--fs);
          line-height: 1.2;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
        }

        .aurora-mask {
          position: relative;
          display: inline-block;

          /* Clip gradients to glyphs only */
          color: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;

          /* Keep it razor sharp */
          text-shadow: none;
          filter: none;
          mix-blend-mode: normal;

          /* AA helpers */
          text-rendering: geometricPrecision;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;

          /* Use percentages but keep motion gentle to reduce shimmering */
          background-size: 300% 300%, 280% 280%, 320% 320%, 300% 300%, 100% 100%;
          background-position: 0% 0%, 100% 10%, 10% 100%, 90% 90%, 0% 0%;
          animation: auroraShift 12s ease-in-out infinite alternate;

          /* inherit typography */
          font: inherit;
          letter-spacing: inherit;
          line-height: 1.2;

          /* Important: avoid GPU promotion that can disable subpixel AA */
          will-change: auto;
          backface-visibility: hidden;
        }

        .aurora-mask::before {
          content: attr(data-text);
          display: block;
          font: inherit;
          letter-spacing: inherit;
        }

        @keyframes auroraShift {
          0% {
            background-position: 0% 50%, 100% 50%, 50% 0%, 50% 100%, 0% 0%;
          }
          25% {
            background-position: 100% 0%, 0% 100%, 100% 100%, 0% 0%, 0% 0%;
          }
          50% {
            background-position: 50% 100%, 50% 0%, 0% 50%, 100% 50%, 0% 0%;
          }
          75% {
            background-position: 0% 100%, 100% 0%, 0% 0%, 100% 100%, 0% 0%;
          }
          100% {
            background-position: 0% 50%, 100% 50%, 50% 0%, 50% 100%, 0% 0%;
          }
        }

        /* Optional: uncomment for a hairline edge (very crisp, not "blurry") */
        /* .aurora-mask::before { -webkit-text-stroke: 0.35px hsl(var(--foreground) / 0.3); } */

        /* Respect reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .aurora-mask::before {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
