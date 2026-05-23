import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 320, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 320, damping: 28 });

  useEffect(() => {
    const move = (event) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return <motion.div className="pointer-events-none fixed z-[90] hidden h-5 w-5 rounded-full border border-cyan-200 mix-blend-difference md:block" style={{ x: smoothX, y: smoothY }} />;
}
