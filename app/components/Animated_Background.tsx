"use client";

import CursorParticles from "./CursorParticles";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mouse, setMouse] = useState({
    x: -500,
    y: -500,
  });

  useEffect(() => {
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
      <style jsx>{`
        .animated-bg {
          position: fixed;
          inset: 0;
          z-index: -1;
          overflow: hidden;
          background:
            radial-gradient(
              circle at 20% 20%,
              rgba(59, 130, 246, 0.18),
              transparent 30%
            ),
            radial-gradient(
              circle at 80% 30%,
              rgba(168, 85, 247, 0.14),
              transparent 35%
            ),
            radial-gradient(
              circle at 50% 80%,
              rgba(34, 197, 94, 0.10),
              transparent 40%
            ),
            #050816;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(140px);
          opacity: 0.55;
        }

        .orb-1 {
          width: 450px;
          height: 450px;
          background: #2563eb;
          top: -120px;
          left: -120px;
          animation: float1 18s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #7c3aed;
          top: 20%;
          right: -100px;
          animation: float2 22s ease-in-out infinite;
        }

        .orb-3 {
          width: 450px;
          height: 450px;
          background: #22c55e;
          bottom: 15%;
          left: 45%;
          opacity: 0.65;
          animation: float3 20s ease-in-out infinite;
        }

        .grid {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.03) 1px,
              transparent 1px
            );

          background-size: 60px 60px;

          mask-image: radial-gradient(
            circle at center,
            black,
            transparent 90%
          );
        }

        .particle {
          position: absolute;
          width: 128px;
          height: 128px;

          border-radius: 9999px;

          background: transparent;

          border:
            1px solid rgba(
              255,
              255,
              255,
              0.15
            );

          box-shadow:
            0 0 10px rgba(
              255,
              255,
              255,
              0.08
            );

          z-index: 5;
        }

        .particle-0 {
          animation:
            particleFloat1 linear infinite;
        }

        .particle-1 {
          animation:
            particleFloat2 linear infinite;
        }

        .particle-2 {
          animation:
            particleFloat3 linear infinite;
        }

        .particle-3 {
          animation:
            particleFloat4 linear infinite;
        }

        @keyframes particleFloat1 {
          0% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(
              120px,
              -180px
            );
          }

          100% {
            transform: translate(
              60px,
              -420px
            );
          }
        }

        @keyframes particleFloat2 {
          0% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(
              -150px,
              -140px
            );
          }

          100% {
            transform: translate(
              -80px,
              -380px
            );
          }
        }

        @keyframes particleFloat3 {
          0% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(
              180px,
              80px
            );
          }

          100% {
            transform: translate(
              280px,
              -120px
            );
          }
        }

        @keyframes particleFloat4 {
          0% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(
              -120px,
              120px
            );
          }

          100% {
            transform: translate(
              -220px,
              -60px
            );
          }
        }

        @keyframes float1 {
          0% {
            transform: translate(
              0,
              0
            );
          }

          50% {
            transform: translate(
              400px,
              200px
            );
          }

          100% {
            transform: translate(
              0,
              0
            );
          }
        }

        @keyframes float2 {
          0% {
            transform: translate(
              0,
              0
            );
          }

          50% {
            transform: translate(
              -500px,
              250px
            );
          }

          100% {
            transform: translate(
              0,
              0
            );
          }
        }

        @keyframes float3 {
          0% {
            transform: translate(
              0,
              0
            );
          }

          50% {
            transform: translate(
              -350px,
              -250px
            );
          }

          100% {
            transform: translate(
              0,
              0
            );
          }
        }
      `}</style>

      <div className="animated-bg">
        <div className="grid" />

        {Array.from({ length: 120 }).map((_, index) => (
          <div
            key={index}
            className={`particle particle-${index % 4}`}
            style={{
              left: `${(index * 17) % 100}%`,
              top: `${(index * 13) % 100}%`,
              animationDelay: `${index * 0.2}s`,
              animationDuration: `${12 + (index % 8)}s`,
            }}
          />
        ))}

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <CursorParticles />
      </div>
    </>
  );
}