import { useEffect, type JSX } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticleBackground(): JSX.Element {
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).catch((err) => console.error("Particles init error:", err));
    }, []);

    return (
        <Particles
            id="tsparticles"
            options={{
                fullScreen: { enable: false },
                background: {
                    color: { value: "transparent" }, // fondo transparente
                },
                particles: {
                    number: {
                        value: 60,
                        density: { enable: true },
                    },
                    color: {
                        value: "#D9EEF2", // el color de tus variables CSS
                    },
                    shape: {
                        type: "circle",
                    },
                    opacity: {
                        value: 0.6,
                    },
                    size: {
                        value: { min: 1, max: 3 },
                    },
                    move: {
                        enable: true,
                        speed: 0.5,
                        direction: "none",
                        outModes: {
                            default: "out",
                        },
                    },
                    links: {
                        enable: false, // quitar líneas entre partículas
                    },
                },
                interactivity: {
                    detectsOn: "canvas",
                    events: {
                        onHover: { enable: false },
                        onClick: { enable: false },
                    },
                },
                detectRetina: true,
            }}
            className="absolute top-0 left-0 w-full h-full z-0"
        />
    );
}
