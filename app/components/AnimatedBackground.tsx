"use client";
import Particles from "@tsparticles/react";
export default function AnimatedBackground() {

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={async () => {}}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },

        background: {
          color: "#050816",
        },

        fpsLimit: 120,

        particles: {
          number: {
            value: 80,
          },

          color: {
            value: "#ffffff",
          },

          links: {
            enable: true,
            color: "#4f46e5",
            distance: 150,
            opacity: 0.3,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1,
          },

          opacity: {
            value: 0.4,
          },

          size: {
            value: {
              min: 1,
              max: 3,
            },
          },
        },

        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
            },

            onClick: {
              enable: true,
              mode: "push",
            },
          },

          modes: {
            grab: {
              distance: 180,
              links: {
                opacity: 0.8,
              },
            },

            push: {
              quantity: 4,
            },
          },
        },

        detectRetina: true,
      }}
    />
  );
}
