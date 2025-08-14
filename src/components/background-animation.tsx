"use client";

import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import p5 from "p5";

class Node {
  p: p5;
  pos: p5.Vector;
  vel: p5.Vector;
  target: p5.Vector;
  noiseOffset: p5.Vector;
  glow: number = 0;
  id: number;

  constructor(p: p5, id: number) {
    this.p = p;
    this.id = id;
    this.pos = p.createVector(p.random(p.width), p.random(p.height));
    this.vel = p.createVector();
    this.target = this.pos.copy();
    this.noiseOffset = p.createVector(p.random(1000), p.random(1000));
  }

  update(mouse: p5.Vector) {
    // Gentle drift
    const noiseX = this.p.noise(this.noiseOffset.x + this.p.frameCount * 0.001);
    const noiseY = this.p.noise(this.noiseOffset.y + this.p.frameCount * 0.001);
    this.target.add(
      this.p.createVector(
        this.p.map(noiseX, 0, 1, -0.5, 0.5),
        this.p.map(noiseY, 0, 1, -0.5, 0.5)
      )
    );

    // Move towards target
    const toTarget = p5.Vector.sub(this.target, this.pos);
    toTarget.mult(0.01);
    this.vel.add(toTarget);

    // Mouse interaction - Repel
    const d = this.p.dist(this.pos.x, this.pos.y, mouse.x, mouse.y);
    if (d < 150) {
      const repel = p5.Vector.sub(this.pos, mouse);
      const strength = this.p.map(d, 0, 150, 5, 0); // Inverse strength
      repel.setMag(strength);
      this.vel.add(repel);
    }

    this.vel.limit(4); // Limit velocity to prevent extreme speeds
    this.pos.add(this.vel);
    this.vel.mult(0.95); // Add friction

    // Slowly fade glow from pulses
    this.glow = this.p.lerp(this.glow, 0, 0.05);

    // Edges
    if (
      this.pos.x < 0 ||
      this.pos.x > this.p.width ||
      this.pos.y < 0 ||
      this.pos.y > this.p.height
    ) {
      this.pos = this.p.createVector(
        this.p.random(this.p.width),
        this.p.random(this.p.height)
      );
      this.target = this.pos.copy();
    }
  }

  setGlow(value: number) {
    this.glow = Math.max(this.glow, value);
  }

  show(baseColor: p5.Color) {
    this.p.noStroke();
    const finalColor = this.p.lerpColor(
      this.p.color(0, 0),
      baseColor,
      this.glow
    );
    this.p.fill(finalColor);
    this.p.circle(this.pos.x, this.pos.y, 4);

    // Core glow
    this.p.fill(baseColor);
    this.p.circle(this.pos.x, this.pos.y, 2);
  }
}

class FiringPulse {
  p: p5;
  origin: Node;
  target: Node;
  progress: number;
  speed: number;

  constructor(p: p5, origin: Node, target: Node) {
    this.p = p;
    this.origin = origin;
    this.target = target;
    this.progress = 0;
    this.speed = p.random(0.02, 0.05);
  }

  update() {
    this.progress += this.speed;
    if (this.progress >= 1) {
      this.target.setGlow(1);
    }
  }

  isDone() {
    return this.progress >= 1;
  }

  show(color: p5.Color) {
    if (this.isDone()) return;
    const currentPos = p5.Vector.lerp(
      this.origin.pos,
      this.target.pos,
      this.progress
    );
    this.p.noStroke();

    const glow = Math.sin(this.progress * this.p.PI) * 1;
    const c = this.p.lerpColor(this.p.color(0, 0), color, glow);

    this.p.fill(c);
    this.p.circle(currentPos.x, currentPos.y, 4);
  }
}

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !canvasRef.current) return;

    const sketch = (p: p5) => {
      let nodes: Node[] = [];
      let pulses: FiringPulse[] = [];
      const numNodes = p.windowWidth > 768 ? 250 : 125;
      let needsColorUpdate = true;

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
        return {
          primary: p.color(h, s, l, 0.6),
          background: p.color(bgH, bgS, bgL),
        };
      };

      // Add a global function to trigger color update
      (p as any).updateThemeColors = () => {
        needsColorUpdate = true;
      };

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(
          canvasRef.current!
        );

        for (let i = 0; i < numNodes; i++) {
          nodes.push(new Node(p, i));
        }
      };

      p.draw = () => {
        // Get current theme colors every frame or when needed
        const colors = getCurrentThemeColors();

        p.background(colors.background, 0.2);
        const mouse = p.createVector(p.mouseX, p.mouseY);

        // Draw connections
        p.stroke(colors.primary);
        p.strokeWeight(0.5);
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = p.dist(
              nodes[i].pos.x,
              nodes[i].pos.y,
              nodes[j].pos.x,
              nodes[j].pos.y
            );
            if (d < 120) {
              p.line(
                nodes[i].pos.x,
                nodes[i].pos.y,
                nodes[j].pos.x,
                nodes[j].pos.y
              );
            }
          }
        }

        nodes.forEach((node) => {
          node.update(mouse);
          node.show(colors.primary);
        });

        pulses.forEach((pulse) => {
          pulse.update();
          pulse.show(colors.primary);
        });

        pulses = pulses.filter((p) => !p.isDone());

        if (p.frameCount % 10 === 0 && pulses.length < nodes.length) {
          const startNode = p.random(nodes);
          const potentialTargets = nodes.filter(
            (n) =>
              n.id !== startNode.id &&
              p.dist(startNode.pos.x, startNode.pos.y, n.pos.x, n.pos.y) < 150
          );
          if (potentialTargets.length > 0) {
            const targetNode = p.random(potentialTargets);
            pulses.push(new FiringPulse(p, startNode, targetNode));
            startNode.setGlow(1);
          }
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        nodes = [];
        pulses = [];
        const newNumNodes = p.windowWidth > 768 ? 250 : 125;
        for (let i = 0; i < newNumNodes; i++) {
          nodes.push(new Node(p, i));
        }
        const colors = getCurrentThemeColors();
        p.background(colors.background);
      };
    };

    p5InstanceRef.current = new p5(sketch);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, []); // Remove resolvedTheme dependency to prevent recreation

  // Separate effect to handle theme changes
  useEffect(() => {
    if (p5InstanceRef.current && resolvedTheme) {
      const p = p5InstanceRef.current;
      // Call the updateThemeColors function we added to the p5 instance
      if ((p as any).updateThemeColors) {
        (p as any).updateThemeColors();
      }
    }
  }, [resolvedTheme]);

  return (
    <div
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full -z-10"
    />
  );
}
