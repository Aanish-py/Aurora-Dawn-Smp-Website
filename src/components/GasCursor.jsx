import { useEffect, useRef } from 'react';

const GasCursor = () => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const audioRef = useRef(null);
    const particles = useRef([]);
    const mouse = useRef({ x: 0, y: 0, lastX: 0, lastY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        contextRef.current = ctx;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', resize);
        resize();

        const addPuff = (x, y, dx, dy) => {
            // Randomize position slightly
            const spread = 5;
            const px = x + (Math.random() - 0.5) * spread;
            const py = y + (Math.random() - 0.5) * spread;

            // Gas physics
            // Slight natural rise (negative y) + random drift
            const vx = dx * 0.1 + (Math.random() - 0.5) * 0.5;
            const vy = dy * 0.1 + (Math.random() - 0.5) * 0.5 - 0.5;

            particles.current.push({
                x: px,
                y: py,
                vx,
                vy,
                size: Math.random() * 5 + 10, // Start size (smaller)
                maxSize: Math.random() * 15 + 25, // End size (smaller)
                life: 1,
                decay: Math.random() * 0.01 + 0.02, // Slightly faster decay
                hue: Math.random() * 60 + 140, // Aurora spectrum (Green/Cyan/Blue)
                rotation: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.05
            });
        };

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            mouse.current.lastX = mouse.current.x;
            mouse.current.lastY = mouse.current.y;
            mouse.current.x = clientX;
            mouse.current.y = clientY;

            // Calculate distance moved to determine density
            const dx = clientX - mouse.current.lastX;
            const dy = clientY - mouse.current.lastY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Add puffs based on movement
            if (dist > 5) {
                addPuff(clientX, clientY, dx, dy);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw particles
            // Iterate backwards to allow safe removal
            for (let i = particles.current.length - 1; i >= 0; i--) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;

                // Friction
                p.vx *= 0.95;
                p.vy *= 0.95;

                p.size += (p.maxSize - p.size) * 0.05; // Grow over time
                p.life -= p.decay;
                p.rotation += p.spin;

                if (p.life <= 0) {
                    particles.current.splice(i, 1);
                    continue;
                }

                ctx.save();
                ctx.translate(p.x, p.y);
                // No rotation for the gradient context itself, but maybe for a texture?
                // Gradient is radial so rotation doesn't matter much unless we use an image.
                // But let's keep it for potential future shape use.
                // Actually for a pure radial gradient, rotation is invisible.

                // Create soft puff
                // Use a larger gradient radius for smoother falloff
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);

                // Fade out based on life
                const alpha = p.life * 0.1; // Max opacity 0.1 (much more subtle)

                gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha})`);
                gradient.addColorStop(0.4, `hsla(${p.hue}, 70%, 50%, ${alpha * 0.5})`);
                gradient.addColorStop(1, `hsla(${p.hue}, 60%, 40%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(0, 0, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            animId = requestAnimationFrame(animate);
        };

        let animId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-50 pointer-events-none mix-blend-screen"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default GasCursor;
