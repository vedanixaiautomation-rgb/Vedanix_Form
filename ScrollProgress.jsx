import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="fixed left-0 top-0 z-[80] h-1 w-full origin-left bg-cyan-300" style={{ scaleX }} />;
}
