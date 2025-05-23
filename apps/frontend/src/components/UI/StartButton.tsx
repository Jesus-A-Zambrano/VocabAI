import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CanvasButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const particles = Array.from({ length: 50 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2 + 1,
            dx: Math.random() - 0.5,
            dy: Math.random() - 0.5,
        }));

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255, 165, 0, 0.3)";
            particles.forEach((p) => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;

                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center mt-16">
            <p className="text-lg text-gray-700 mb-4 z-10">Pulsa el botón para comenzar la práctica</p>

            {/* Canvas background */}
            <canvas
                ref={canvasRef}
                width={200}
                height={200}
                className="absolute w-52 h-52 rounded-full z-0"
            />

            {/* Botón circular con animación */}
            <motion.button
                onClick={onClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="z-10 w-20 h-20 bg-orange-500 text-white rounded-full text-xl font-bold shadow-lg transition"
            >
                ▶
            </motion.button>
        </div>
    );
};

export default CanvasButton;
