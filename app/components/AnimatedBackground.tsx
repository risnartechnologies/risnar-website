"use client";

export default function AnimatedBackground() {
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
              rgba(168, 85, 247, 0.12),
              transparent 30%
            ),
            radial-gradient(
              circle at 50% 80%,
              rgba(34, 197, 94, 0.10),
              transparent 35%
            ),
            #050816;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
          opacity: 0.4;
          animation: float 18s ease-in-out infinite;
        }

        .orb-1 {
          width: 280px;
          height: 280px;
          background: #2563eb;
          top: 10%;
          left: 10%;
        }

        .orb-2 {
          width: 240px;
          height: 240px;
          background: #7c3aed;
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        .orb-3 {
          width: 220px;
          height: 220px;
          background: #22c55e;
          bottom: 10%;
          left: 35%;
          animation-delay: 8s;
        }

        .grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.03) 1px,
              transparent 1px
            );

          background-size: 60px 60px;

          mask-image: radial-gradient(
            circle at center,
            black,
            transparent 90%
          );
        }

        @keyframes float {
          0% {
            transform: translate(0px, 0px);
          }

          50% {
            transform: translate(40px, -40px);
          }

          100% {
            transform: translate(0px, 0px);
          }
        }
      `}</style>

      <div className="animated-bg">
        <div className="grid" />

        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
    </>
  );
}
