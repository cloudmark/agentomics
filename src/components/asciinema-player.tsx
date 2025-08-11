"use client";

import { cn } from "@/lib/utils";
import "asciinema-player/dist/bundle/asciinema-player.css";
import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "next-themes";

type AsciinemaPlayerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  src: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  opts?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCanPlay?: (player: any) => void;
};

export function AsciinemaPlayer({
  src,
  className,
  ...props
}: AsciinemaPlayerProps) {
  const ref = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
        player = AsciinemaPlayerLibrary.create(src, currentRef, {
          fit: "width",
          theme: asciinemaTheme,
          poster: "data:text/plain,Loading Recording...",
          loop: true,
          autoplay: true,
          speed: 1.5,
          fontSize: isMobile ? "x-small" : "small",
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
  }, [src, windowWidth, resolvedTheme]);

  const isMobile = windowWidth < 768;

  return (
    <div
      ref={containerRef}
      className={cn("w-full max-w-full overflow-x-auto", className)}
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="w-full min-w-0"
        style={{
          fontSize: isMobile ? "10px" : "14px",
          lineHeight: isMobile ? "1.2" : "1.4",
        }}
      />
    </div>
  );
}
