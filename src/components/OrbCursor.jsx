import { useEffect, useRef } from 'react';
import useIsMobile from '../hooks/useIsMobile';

const OrbCursor = () => {
    const canvasRef = useRef(null);
    const isMobile = useIsMobile();

    useEffect(() => {
        if (isMobile) return;
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        // Orb state
        const orb = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            targetX: window.innerWidth / 2,
            targetY: window.innerHeight / 2,
            radius: 120,
            // Trail history (comet tail)
            trail: [],
            maxTrail: 60,
        };

        // Hue cycling for colour shift (orange → gold → green)
        let hue = 30;
        let hueDir = 1;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e) => {
            orb.targetX = e.clientX;
            orb.targetY = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);

        let animId;
        const animate = () => {
            // Clear
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Smooth follow — orb lags behind cursor for natural feel
            const ease = 0.06;
            orb.x += (orb.targetX - orb.x) * ease;
            orb.y += (orb.targetY - orb.y) * ease;

            // Record trail
            orb.trail.push({ x: orb.x, y: orb.y });
            if (orb.trail.length > orb.maxTrail) orb.trail.shift();

            // Cycle hue slowly (warm orange → golden → warm green)
            hue += 0.3 * hueDir;
            if (hue > 65) hueDir = -1;
            if (hue < 10) hueDir = 1;

            // --- Draw comet tail ---
            if (orb.trail.length > 2) {
                for (let i = 1; i < orb.trail.length; i++) {
                    const t = i / orb.trail.length; // 0 = oldest, 1 = newest
                    const prev = orb.trail[i - 1];
                    const curr = orb.trail[i];

                    const lineWidth = t * 6;
                    const alpha = Math.pow(t, 1.5) * 0.55;

                    // gradient along the streak
                    const grad = ctx.createLinearGradient(prev.x, prev.y, curr.x, curr.y);
                    grad.addColorStop(0, `hsla(${hue - 15}, 100%, 60%, 0)`);
                    grad.addColorStop(1, `hsla(${hue}, 100%, 65%, ${alpha})`);

                    ctx.beginPath();
                    ctx.moveTo(prev.x, prev.y);
                    ctx.lineTo(curr.x, curr.y);
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = lineWidth;
                    ctx.lineCap = 'round';
                    ctx.stroke();
                }
            }

            // --- Draw main glowing orb ---
            // Outer glow (large, very soft)
            const outerGlow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 2.5);
            outerGlow.addColorStop(0, `hsla(${hue}, 100%, 60%, 0.18)`);
            outerGlow.addColorStop(0.4, `hsla(${hue - 10}, 100%, 50%, 0.10)`);
            outerGlow.addColorStop(1, `hsla(${hue}, 100%, 40%, 0)`);

            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = outerGlow;
            ctx.fill();

            // Mid glow
            const midGlow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
            midGlow.addColorStop(0, `hsla(${hue + 10}, 100%, 75%, 0.55)`);
            midGlow.addColorStop(0.4, `hsla(${hue}, 100%, 60%, 0.35)`);
            midGlow.addColorStop(1, `hsla(${hue - 10}, 90%, 45%, 0)`);

            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
            ctx.fillStyle = midGlow;
            ctx.fill();

            // Inner bright core
            const core = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * 0.35);
            core.addColorStop(0, `hsla(50, 100%, 95%, 0.9)`);
            core.addColorStop(0.5, `hsla(${hue + 20}, 100%, 80%, 0.7)`);
            core.addColorStop(1, `hsla(${hue}, 100%, 60%, 0)`);

            ctx.beginPath();
            ctx.arc(orb.x, orb.y, orb.radius * 0.35, 0, Math.PI * 2);
            ctx.fillStyle = core;
            ctx.fill();

            animId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animId);
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-40 pointer-events-none mix-blend-lighten"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default OrbCursor;
