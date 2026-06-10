"use client";

import { useEffect, useState } from "react";

type Particle = {
  x: number;
  y: number;
  size: number;
};

export default function CursorParticles() {
  const [mouse, setMouse] = useState({
    x: -1000,
    y: -1000,
  });

  const [particles, setParticles] = useState<
    Particle[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from(
        { length: 360 },
        () => ({
          x:
            Math.random() *
            window.innerWidth,

          y:
            Math.random() *
            window.innerHeight,

          size:
            12 +
            Math.random() * 18,
        })
      )
    );

    const handleMouseMove = (
      event: MouseEvent
    ) => {
      setMouse({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () =>
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
  }, []);

  return (
    <>
      {particles.map(
        (particle, index) => {
          const dx =
            particle.x - mouse.x;

          const dy =
            particle.y - mouse.y;

          const distance =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          const radius = 180;

          let offsetX = 0;
          let offsetY = 0;

          if (
            distance < radius
          ) {
            const force =
              (radius -
                distance) /
              radius;

            offsetX =
              (dx /
                Math.max(
                  distance,
                  1
                )) *
              force *
              120;

            offsetY =
              (dy /
                Math.max(
                  distance,
                  1
                )) *
              force *
              120;
          }

          return (
            <div
              key={index}
              style={{
                position:
                  "fixed",

                left:
                  particle.x,

                top:
                  particle.y,

                width:
                  particle.size,

                height:
                  particle.size,

                borderRadius:
                  "50%",

                background:
                  "transparent",

                border:
                  "1px solid rgba(255,255,255,0.25)",

                boxShadow:
                  "0 0 8px rgba(255,255,255,0.08)",

                transform: `translate(${offsetX}px, ${offsetY}px)`,

                transition:
                  "transform 0.12s linear",

                pointerEvents:
                  "none",

                zIndex: 20,
              }}
            />
          );
        }
      )}
    </>
  );
}