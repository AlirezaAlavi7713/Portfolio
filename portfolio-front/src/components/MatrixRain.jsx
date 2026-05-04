import { useEffect, useRef } from "react";

const CHARS = "アイウエオカキクケコ01アBCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|#@$%&";

export default function MatrixRain() {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const fontSize = 13;
    let drops = [];
    const initDrops = () => {
      const cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    };
    initDrops();
    window.addEventListener("resize", initDrops);

    const COLORS = ["#7c3aed", "#d4a853", "#06b6d4", "#ffffff"];

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 15, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const r = Math.random();
        ctx.fillStyle = r > 0.97 ? "#ffffff" : r > 0.7 ? COLORS[0] : r > 0.4 ? COLORS[1] : COLORS[2];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.7;
      }
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", initDrops);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        opacity: 0.28,
        pointerEvents: "none",
      }}
    />
  );
}
