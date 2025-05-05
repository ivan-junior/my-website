"use client";

import { useEffect } from "react";

const DynamicFavicon = () => {
  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 32;
    canvas.height = 32;

    // Draw terminal background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, 32, 32);

    let cursorVisible = true;

    const drawCursor = () => {
      // Clear previous cursor
      ctx.fillStyle = "#000000";
      ctx.fillRect(12, 8, 8, 16);

      // Draw new cursor if visible
      if (cursorVisible) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(12, 8, 8, 16);
      }

      // Update favicon
      let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link") as HTMLLinkElement;
        document.head.appendChild(link);
      }

      link.type = "image/x-icon";
      link.rel = "shortcut icon";
      link.href = canvas.toDataURL();

      // Toggle cursor visibility
      cursorVisible = !cursorVisible;
    };

    // Start blinking animation
    const interval = setInterval(drawCursor, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default DynamicFavicon;
