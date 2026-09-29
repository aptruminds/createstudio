'use client';

import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'motion/react';
import { useEffect, type CSSProperties, type ReactNode } from 'react';

// Rotating conic-gradient border + soft inner glow, adapted from
// hover.dev's "AI gradient animation card". Wrap any CTA; the wrapper's
// border-radius is inherited by the ring, clip, and glow layers.
export default function AIGradientBorder({
  children,
  className = '',
  duration = 3,
  style,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  style?: CSSProperties;
}) {
  const turn = useMotionValue(0);

  useEffect(() => {
    const controls = animate(turn, 1, {
      ease: 'linear',
      duration,
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [duration, turn]);

  const gradient = useMotionTemplate`conic-gradient(from ${turn}turn, transparent 0%, #f472b600 5%, #f472b6 10%, #c084fc 18%, #818cf8 26%, #38bdf8 34%, #2dd4bf 42%, #fbbf24 46%, #fbbf2400 52%, transparent 56%)`;

  return (
    <div className={`ai-border ${className}`} style={style}>
      <motion.div style={{ backgroundImage: gradient }} className="ai-border-ring" />
      <div className="ai-border-clip">
        <div className="ai-border-content">{children}</div>
        <motion.div
          style={{ backgroundImage: gradient }}
          className="ai-border-glow ai-glow-spill-mask"
        />
      </div>
    </div>
  );
}
