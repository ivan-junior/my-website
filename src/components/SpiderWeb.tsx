"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Connecting dots component. I called it SpiderWeb cause... Well, it looks like one
 */
const SpiderWeb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Points configuration
    const POINTS_COUNT = 130;
    const LINE_LENGTH = 150;
    let points: { x: number; y: number; vx: number; vy: number }[] = [];
    let mouse = { x: 0, y: 0 };

    // Initialize points
    for (let i = 0; i < POINTS_COUNT; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = theme === "light" ? "#f9fafb" : "#111827";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw points
      points.forEach((point, i) => {
        // Move points
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Keep points in bounds
        point.x = Math.max(0, Math.min(canvas.width, point.x));
        point.y = Math.max(0, Math.min(canvas.height, point.y));

        // Draw connections
        points.forEach((otherPoint, j) => {
          if (i === j) return;

          const dx = otherPoint.x - point.x;
          const dy = otherPoint.y - point.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < LINE_LENGTH) {
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.strokeStyle =
              theme === "light"
                ? `rgba(17, 24, 39, ${0.15 * (1 - distance / LINE_LENGTH)})`
                : `rgba(0, 162, 255, ${0.15 * (1 - distance / LINE_LENGTH)})`;
            ctx.stroke();
          }
        });

        // Draw connections to mouse
        const mouseDistance = Math.sqrt(
          Math.pow(mouse.x - point.x, 2) + Math.pow(mouse.y - point.y, 2)
        );
        if (mouseDistance < LINE_LENGTH * 1.5) {
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle =
            theme === "light"
              ? `rgba(17, 24, 39, ${
                  0.3 * (1 - mouseDistance / (LINE_LENGTH * 1.5))
                })`
              : `rgba(0, 162, 255, ${
                  0.3 * (1 - mouseDistance / (LINE_LENGTH * 1.5))
                })`;
          ctx.stroke();
        }

        // Draw point
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "light"
            ? "rgba(17, 24, 39, 0.5)"
            : "rgba(255, 255, 255, 0.5)";
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
    />
  );
};

export default SpiderWeb;
