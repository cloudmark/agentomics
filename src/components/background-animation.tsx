"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import p5 from "p5";

interface GridNode {
  x: number;
  y: number;
  col: number;
  row: number;
  activation: number;
}

interface Wave {
  centerCol: number;
  centerRow: number;
  radius: number;
  maxRadius: number;
  speed: number;
  useComplementary: boolean; // Flag to use complementary color
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const sketch = (p: p5) => {
      let primaryColor: p5.Color;
      let complementaryColor: p5.Color;
      let backgroundColor: p5.Color;
      let spacing = 60;
      let cols = 0;
      let rows = 0;
      let grid: GridNode[][] = [];
      let waves: Wave[] = [];
      let lastWaveTime = 0;
      let lastMouseWaveCol = -1;
      let lastMouseWaveRow = -1;
      let mouseWaveActive = false;

      const getCurrentThemeColors = () => {
        const computedStyle = getComputedStyle(document.documentElement);

        const primaryColorStr = computedStyle
          .getPropertyValue("--primary")
          .trim();
        const [h, s, l] = primaryColorStr.split(" ").map(parseFloat);

        const bgColorStr = computedStyle
          .getPropertyValue("--background")
          .trim();
        const [bgH, bgS, bgL] = bgColorStr.split(" ").map(parseFloat);

        p.colorMode(p.HSL, 360, 100, 100, 1);

        // Check if dark mode (low lightness background)
        const isDark = bgL < 50;

        // Adjust colors for better visibility in dark mode
        if (isDark) {
          primaryColor = p.color(
            h || 262,
            (s || 88) * 1.2,
            Math.min((l || 66) * 1.5, 85)
          );
          const compH = (h + 180) % 360;
          complementaryColor = p.color(
            compH,
            (s || 88) * 1.1,
            Math.min((l || 66) * 1.5, 85)
          );
        } else {
          primaryColor = p.color(h || 262, s || 88, l || 66);
          const compH = (h + 180) % 360;
          complementaryColor = p.color(compH, (s || 88) * 0.8, (l || 66) * 1.1);
        }

        backgroundColor = p.color(bgH || 0, bgS || 0, bgL || 96);
      };

      const createGrid = () => {
        grid = [];
        spacing = p.windowWidth > 768 ? 30 : 40;

        cols = p.floor(p.width / spacing) + 1;
        rows = p.floor(p.height / spacing) + 1;

        for (let col = 0; col < cols; col++) {
          grid[col] = [];
          for (let row = 0; row < rows; row++) {
            grid[col][row] = {
              x: col * spacing,
              y: row * spacing,
              col,
              row,
              activation: 0,
            };
          }
        }
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(
          canvasRef.current!
        );
        getCurrentThemeColors();
        createGrid();
        p.frameRate(30);
      };

      p.draw = () => {
        getCurrentThemeColors();
        p.background(backgroundColor);

        // Create new waves periodically - double pulsation with alternating colors
        if (p.millis() - lastWaveTime > 3000) {
          const centerCol = p.floor(p.random(cols));
          const centerRow = p.floor(p.random(rows));
          const useComp = p.random() > 0.5; // Randomly choose color

          // Create two waves from the same point - one primary, one complementary
          waves.push({
            centerCol,
            centerRow,
            radius: 0,
            maxRadius: p.random(20, 35),
            speed: 0.15,
            useComplementary: useComp,
          });

          // Second wave with slight delay - opposite color
          waves.push({
            centerCol,
            centerRow,
            radius: -3, // Start slightly behind
            maxRadius: p.random(20, 35),
            speed: 0.15,
            useComplementary: !useComp, // Opposite color
          });

          lastWaveTime = p.millis();
        }

        // Update waves
        waves.forEach((wave) => {
          wave.radius += wave.speed;
        });

        // Remove completed waves
        waves = waves.filter((wave) => wave.radius < wave.maxRadius + 2);

        // Decay all activations
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            grid[col][row].activation *= 0.9;
          }
        }

        // Mouse interaction - create waves on mouse movement
        if (
          p.mouseX > 0 &&
          p.mouseX < p.width &&
          p.mouseY > 0 &&
          p.mouseY < p.height
        ) {
          const mouseCol = p.floor(p.mouseX / spacing);
          const mouseRow = p.floor(p.mouseY / spacing);

          // Only create wave if mouse moved to a new grid cell or previous wave finished
          if (
            (!mouseWaveActive ||
              mouseCol !== lastMouseWaveCol ||
              mouseRow !== lastMouseWaveRow) &&
            p.frameCount % 10 === 0
          ) {
            waves.push({
              centerCol: mouseCol,
              centerRow: mouseRow,
              radius: 0,
              maxRadius: p.random(8, 12),
              speed: 0.25,
              useComplementary: p.random() > 0.5,
            });
            lastMouseWaveCol = mouseCol;
            lastMouseWaveRow = mouseRow;
            mouseWaveActive = true;
          }

          // Check if mouse wave finished
          if (mouseWaveActive) {
            const hasActiveMouseWave = waves.some(
              (w) =>
                w.centerCol === lastMouseWaveCol &&
                w.centerRow === lastMouseWaveRow &&
                w.maxRadius < 13 // Mouse waves have maxRadius 8-12
            );
            if (!hasActiveMouseWave) {
              mouseWaveActive = false;
            }
          }

          // Directly activate nearby nodes
          for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
              const node = grid[col][row];
              const d = p.dist(p.mouseX, p.mouseY, node.x, node.y);

              if (d < 100) {
                const influence = p.map(d, 0, 100, 0.6, 0, true);
                node.activation = Math.max(node.activation, influence);
              }
            }
          }
        }

        // Apply wave activations with lifecycle fade and color assignment
        waves.forEach((wave) => {
          // Calculate wave lifecycle (0 = start, 1 = end)
          const lifecycle = wave.radius / wave.maxRadius;

          // Fade in for first 20%, stay strong until 60%, then fade out
          let lifecycleFade;
          if (lifecycle < 0.2) {
            lifecycleFade = lifecycle / 0.2; // Fade in
          } else if (lifecycle < 0.6) {
            lifecycleFade = 1; // Full strength
          } else {
            lifecycleFade = 1 - (lifecycle - 0.6) / 0.4; // Fade out
          }

          for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
              const dist = p.dist(col, row, wave.centerCol, wave.centerRow);

              // Check if node is on the wave front
              if (Math.abs(dist - wave.radius) < 1.5) {
                const proximity = 1 - Math.abs(dist - wave.radius) / 1.5;
                const activation = proximity * lifecycleFade;

                // Store activation with color info
                if (activation > grid[col][row].activation) {
                  grid[col][row].activation = activation;
                  // Store which color this node should use (0 = primary, 1 = complementary)
                  (grid[col][row] as any).colorMix = wave.useComplementary
                    ? 1
                    : 0;
                }
              }
            }
          }
        });

        // Check if dark mode once for all lines
        const computedStyle = getComputedStyle(document.documentElement);
        const bgColorStr = computedStyle
          .getPropertyValue("--background")
          .trim();
        const [, , bgL] = bgColorStr.split(" ").map(parseFloat);
        const isDark = bgL < 50;

        // Draw horizontal lines
        p.strokeWeight(0.5);
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols - 1; col++) {
            const node1 = grid[col][row];
            const node2 = grid[col + 1][row];

            const avgActivation = (node1.activation + node2.activation) / 2;
            const lineAlpha =
              avgActivation > 0.1
                ? p.map(
                    avgActivation,
                    0,
                    1,
                    isDark ? 0.08 : 0.04,
                    isDark ? 0.4 : 0.25
                  )
                : isDark
                ? 0.08
                : 0.04;

            // Use the color assigned by the wave
            const colorMix1 = (node1 as any).colorMix || 0;
            const colorMix2 = (node2 as any).colorMix || 0;
            const avgColorMix = (colorMix1 + colorMix2) / 2;

            const lineColor =
              avgActivation > 0.1
                ? p.lerpColor(primaryColor, complementaryColor, avgColorMix)
                : p.color(primaryColor);
            lineColor.setAlpha(lineAlpha);
            p.stroke(lineColor);

            if (avgActivation > 0.1) {
              p.strokeWeight(0.8 + avgActivation * 0.5);
            } else {
              p.strokeWeight(0.5);
            }

            p.line(node1.x, node1.y, node2.x, node2.y);
          }
        }

        // Draw vertical lines
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows - 1; row++) {
            const node1 = grid[col][row];
            const node2 = grid[col][row + 1];

            const avgActivation = (node1.activation + node2.activation) / 2;
            const lineAlpha =
              avgActivation > 0.1
                ? p.map(
                    avgActivation,
                    0,
                    1,
                    isDark ? 0.08 : 0.04,
                    isDark ? 0.4 : 0.25
                  )
                : isDark
                ? 0.08
                : 0.04;

            // Use the color assigned by the wave
            const colorMix1 = (node1 as any).colorMix || 0;
            const colorMix2 = (node2 as any).colorMix || 0;
            const avgColorMix = (colorMix1 + colorMix2) / 2;

            const lineColor =
              avgActivation > 0.1
                ? p.lerpColor(primaryColor, complementaryColor, avgColorMix)
                : p.color(primaryColor);
            lineColor.setAlpha(lineAlpha);
            p.stroke(lineColor);

            if (avgActivation > 0.1) {
              p.strokeWeight(0.8 + avgActivation * 0.5);
            } else {
              p.strokeWeight(0.5);
            }

            p.line(node1.x, node1.y, node2.x, node2.y);
          }
        }

        p.noStroke();

        // Draw dots
        for (let col = 0; col < cols; col++) {
          for (let row = 0; row < rows; row++) {
            const node = grid[col][row];

            // Check if dark mode for stronger opacity
            const computedStyle = getComputedStyle(document.documentElement);
            const bgColorStr = computedStyle
              .getPropertyValue("--background")
              .trim();
            const [bgH, bgS, bgL] = bgColorStr.split(" ").map(parseFloat);
            const isDark = bgL < 50;

            let size = 1.5;
            let alpha = isDark ? 0.15 : 0.08;

            if (node.activation > 0.1) {
              size = 1.5 + node.activation * 3;
              alpha = isDark
                ? 0.2 + node.activation * 0.7
                : 0.1 + node.activation * 0.5;

              // Subtle glow on active nodes
              if (node.activation > 0.5) {
                const colorMix = (node as any).colorMix || 0;
                const glowColor = p.lerpColor(
                  primaryColor,
                  complementaryColor,
                  colorMix
                );
                glowColor.setAlpha(
                  isDark ? node.activation * 0.25 : node.activation * 0.15
                );
                p.fill(glowColor);
                p.circle(node.x, node.y, size + 6);
              }
            }

            // Use the color assigned by the wave
            const colorMix = (node as any).colorMix || 0;
            const dotColor =
              node.activation > 0.1
                ? p.lerpColor(primaryColor, complementaryColor, colorMix)
                : p.color(primaryColor);
            dotColor.setAlpha(alpha);
            p.fill(dotColor);
            p.circle(node.x, node.y, size);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        getCurrentThemeColors();
        createGrid();
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (p5InstanceRef.current && resolvedTheme) {
      // Theme change triggers redraw
    }
  }, [resolvedTheme]);

  return (
    <>
      <div
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ filter: "blur(1px)" }}
      />
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-background/50 backdrop-blur-[4px]" />
    </>
  );
}
