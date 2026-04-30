'use client';

import { useEffect, useState } from 'react';

export function CursorSpotlight() {
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouch || reducedMotion) return;

    setActive(true);

    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30"
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(232, 220, 196, 0.05), transparent 80%)`,
      }}
    />
  );
}
