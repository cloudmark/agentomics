"use client";

import { cn } from "@/lib/utils";
import "asciinema-player/dist/bundle/asciinema-player.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";
import { Maximize, X, Expand } from "lucide-react";

type AsciinemaPlayerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opts?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCanPlay?: (player: any) => void;
  zoom?: number; // Zoom level multiplier (e.g., 1.5 for 150%)
};

export function AsciinemaPlayer({
  src,
  className,
  zoom = 1,
  ...props
}: AsciinemaPlayerProps) {
  const ref = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme, resolvedTheme } = useTheme();

  // Initialize window width
  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const fullscreenElement =
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).msFullscreenElement;
      setIsFullscreen(!!fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Debounced resize handler
  const handleResize = useCallback(() => {
    // Don't handle resize events when in fullscreen mode
    if (isFullscreen) return;

    const newWidth = window.innerWidth;
    // Only update if the width change is significant (more than 50px)
    // or if it crosses major breakpoints
    if (
      Math.abs(newWidth - windowWidth) > 50 ||
      (windowWidth >= 768 && newWidth < 768) ||
      (windowWidth < 768 && newWidth >= 768) ||
      (windowWidth >= 1024 && newWidth < 1024) ||
      (windowWidth < 1024 && newWidth >= 1024)
    ) {
      setWindowWidth(newWidth);
    }
  }, [windowWidth, isFullscreen]);

  // Set up resize listener with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  // Create/recreate player when window width or theme changes significantly
  useEffect(() => {
    const currentRef = ref.current;
    const isMobile = windowWidth < 768;
    const asciinemaTheme = resolvedTheme === "dark" ? "dracula" : "asciinema";

    // Clean up existing player
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Clear the container
    if (currentRef) {
      currentRef.innerHTML = "";
    }

    if (windowWidth === 0) return; // Don't create player until we have a valid width

    let player;
    const loadAsciinemaPlayer = async () => {
      const AsciinemaPlayerLibrary = await import("asciinema-player");
      if (currentRef && !playerRef.current) {
        const baseFontSize = isMobile ? "large" : "x-large";
        const fontSizes = ["x-small", "small", "medium", "large", "x-large"];
        const baseIndex = fontSizes.indexOf(baseFontSize);
        const zoomedIndex = Math.min(
          fontSizes.length - 1,
          Math.max(0, baseIndex + Math.round(zoom - 1))
        );
        const zoomedFontSize = fontSizes[zoomedIndex];

        player = AsciinemaPlayerLibrary.create(src, currentRef, {
          fit: "width",
          theme: asciinemaTheme,
          poster: "data:text/plain,Loading Recording...",
          loop: true,
          autoplay: true,
          speed: 1.5,
          fontSize: zoom !== 1 ? zoomedFontSize : baseFontSize,
          idleTimeLimit: 5,
        });
        playerRef.current = player;
      }
    };

    loadAsciinemaPlayer();

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, windowWidth, resolvedTheme, zoom]);

  const isMobile = windowWidth < 768;

  const handleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await containerRef.current.requestFullscreen();
      }
    } catch (err) {
      console.error("Error attempting to toggle fullscreen:", err);
      // Fallback to modal if fullscreen API fails
      setIsZoomed(true);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-full overflow-hidden relative group cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-primary/50",
          isFullscreen && "!h-screen flex items-center justify-center bg-black",
          className
        )}
      >
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="w-full min-w-0"
          style={{
            fontSize: isFullscreen
              ? isMobile
                ? `${28 * zoom}px`
                : `${32 * zoom}px`
              : isMobile
              ? `${50 * zoom}px`
              : `${60 * zoom}px`,
            lineHeight: isMobile ? "1.5" : "1.6",
            fontFamily:
              "'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace",
          }}
        />
        {/* Fullscreen button overlay - doesn't cover controls at bottom */}
        {!isFullscreen && (
          <button
            onClick={handleFullscreen}
            className="absolute top-0 left-0 right-0 bottom-12 flex flex-col items-center justify-center bg-black/0 hover:bg-black/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none"
            aria-label="View fullscreen"
          >
            <div className="p-4 bg-black/60 rounded-lg backdrop-blur-sm animate-pulse pointer-events-auto">
              <Expand className="h-10 w-10" />
            </div>
            <p className="mt-4 text-base font-medium bg-black/60 px-5 py-2 rounded-lg backdrop-blur-sm pointer-events-auto flex items-center gap-2">
              Go fullscreen →
            </p>
          </button>
        )}
      </div>

      {/* Fullscreen modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-full max-w-7xl max-h-[90vh] overflow-auto">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors z-10"
              aria-label="Close fullscreen"
            >
              <X className="h-6 w-6" />
            </button>
            <div
              className="transform scale-150 origin-top-left"
              style={{ minWidth: "66.67%" }}
            >
              <AsciinemaPlayer src={src} className="w-full" zoom={zoom} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
