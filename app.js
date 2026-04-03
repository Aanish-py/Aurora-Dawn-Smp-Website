// Aurora Dawn SMP - Main Application Script
// This file must be loaded with type="text/babel"

const { useState, useEffect, useRef, useMemo } = React;
const { motion, useScroll, useTransform, AnimatePresence } = window.Motion;

// --- COMPONENTS ---

// 1. Pill Navbar with scroll hide/show
const Navbar = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const [scrolled, setScrolled] = useState(false);
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show/hide based on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false); // Scrolling down
            } else {
                setVisible(true); // Scrolling up
            }

            setScrolled(currentScrollY > 50);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const tabs = [
        { name: "Home", href: "#home" },
        { name: "Features", href: "#features" },
        { name: "Join", href: "#join" },
    ];

    return (
        <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: visible ? 0 : -120,
                    opacity: visible ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`pointer-events-auto transition-all duration-300 ${scrolled ? 'bg-aurora-dark/80 backdrop-blur-xl p-2' : 'bg-aurora-dark/50 backdrop-blur-md p-3'} border border-white/10 rounded-full flex items-center shadow-2xl shadow-aurora-green/10`}
            >
                <a href="#" className="font-heading text-aurora-green text-xl tracking-wider px-6 flex items-center gap-2">
                    <div className="w-2 h-2 bg-aurora-green rounded-full shadow-[0_0_10px_#00D2A0] animate-pulse-glow"></div>
                    AURORA
                </a>

                <ul className="flex items-center gap-1 bg-black/20 rounded-full p-1 border border-white/5">
                    {tabs.map((tab) => (
                        <li key={tab.name}>
                            <a
                                href={tab.href}
                                onClick={() => setActiveTab(tab.name)}
                                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 block ${activeTab === tab.name ? "text-aurora-dark" : "text-white/60 hover:text-white"}`}
                            >
                                {activeTab === tab.name && (
                                    <motion.div
                                        layoutId="pill-nav"
                                        className="absolute inset-0 bg-aurora-green rounded-full z-0 shadow-lg shadow-aurora-green/20"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.name}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <div className={`hidden md:block w-px h-6 bg-white/10 mx-4 transition-all ${scrolled ? 'opacity-0 w-0 mx-0' : 'opacity-100'}`}></div>

                <button
                    className="hidden md:block bg-white/5 hover:bg-white/10 text-white px-5 py-2 rounded-full text-sm font-medium transition-all border border-white/5 whitespace-nowrap active:scale-95 ml-2"
                    onClick={() => {
                        navigator.clipboard.writeText('play.auroradawn.net');
                        alert('IP Copied!');
                    }}
                >
                    Copy IP
                </button>
            </motion.nav>
        </div>
    );
};

// --- LIQUID ETHER COMPONENT (Three.js) with Mouse Interactivity ---
const LiquidEther = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        containerRef.current.appendChild(renderer.domElement);

        // Shader Material with Mouse Interaction
        const vertexShader = `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0);
            }
        `;

        const fragmentShader = `
            uniform float uTime;
            uniform vec2 uResolution;
            uniform vec2 uMouse;
            uniform vec3 uColorBg;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;

            varying vec2 vUv;

            // Simplex 2D noise
            vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

            float snoise(vec2 v){
              const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
              vec2 i  = floor(v + dot(v, C.yy) );
              vec2 x0 = v -   i + dot(i, C.xx);
              vec2 i1;
              i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
              vec4 x12 = x0.xyxy + C.xxzz;
              x12.xy -= i1;
              i = mod(i, 289.0);
              vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
              vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
              m = m*m ;
              m = m*m ;
              vec3 x = 2.0 * fract(p * C.www) - 1.0;
              vec3 h = abs(x) - 0.5;
              vec3 ox = floor(x + 0.5);
              vec3 a0 = x - ox;
              m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
              vec3 g;
              g.x  = a0.x  * x0.x  + h.x  * x0.y;
              g.yz = a0.yz * x12.xz + h.yz * x12.yw;
              return 130.0 * dot(m, g);
            }

            // FBM
            #define OCTAVES 4
            float fbm(in vec2 st) {
                float value = 0.0;
                float amplitude = .5;
                float frequency = 0.;
                for (int i = 0; i < OCTAVES; i++) {
                    value += amplitude * snoise(st);
                    st *= 2.;
                    amplitude *= .5;
                }
                return value;
            }

            // Domain Warping with Mouse Influence
            float pattern(in vec2 p, in float time, in vec2 mouse, out vec2 q, out vec2 r) {
                // Create mouse influence vector
                vec2 mouseInfluence = (p - mouse) * 0.5;
                float mouseDist = length(mouseInfluence);
                
                // Mouse creates distortion in the pattern
                q = vec2( fbm( p + vec2(0.0,0.0) + mouseInfluence * 0.2 ),
                          fbm( p + vec2(5.2,1.3) ) );

                r = vec2( fbm( p + 4.0*q + vec2(1.7,9.2) + 0.15*time + mouseInfluence * 0.3 ),
                          fbm( p + 4.0*q + vec2(8.3,2.8) + 0.126*time ) );

                return fbm( p + 4.0*r + mouseInfluence * 0.1 );
            }

            void main() {
                vec2 st = vUv;
                st.x *= uResolution.x/uResolution.y;

                // Normalize mouse coordinates
                vec2 mouse = uMouse;
                mouse.x *= uResolution.x/uResolution.y;

                float time = uTime * 0.1;
                vec2 q, r;
                float f = pattern(st * 1.5, time, mouse, q, r);

                // Calculate distance to mouse for interactive effects
                float distToMouse = length(st - mouse);
                float mouseEffect = smoothstep(0.8, 0.0, distToMouse) * 0.5;

                // Color mixing with mouse interaction
                vec3 color = mix(uColorBg, uColor1, length(q) + mouseEffect);
                color = mix(color, uColor2, length(r));
                color = mix(color, uColor3, f);

                // Add mouse cursor glow effect
                float cursorGlow = exp(-distToMouse * 3.0) * 0.3;
                color += uColor1 * cursorGlow;

                // Add some nice contrast/brightness variation
                color = pow(color, vec3(1.1)); 

                gl_FragColor = vec4(color, 1.0);
            }
        `;

        const uniforms = {
            uTime: { value: 0 },
            uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uColorBg: { value: new THREE.Color('#0B1026') },   // Dark Background
            uColor1: { value: new THREE.Color('#00D2A0') },    // Aurora Green
            uColor2: { value: new THREE.Color('#A364FF') },    // Aurora Purple
            uColor3: { value: new THREE.Color('#4B9EFF') },    // Aurora Blue
        };

        const geometry = new THREE.PlaneGeometry(2, 2);
        const material = new THREE.ShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
        });

        const plane = new THREE.Mesh(geometry, material);
        scene.add(plane);

        // Mouse Movement Handler
        const handleMouseMove = (event) => {
            // Normalize mouse coordinates to 0-1 range
            const x = event.clientX / window.innerWidth;
            const y = 1.0 - (event.clientY / window.innerHeight); // Flip Y axis

            // Smooth interpolation for fluid movement
            uniforms.uMouse.value.x += (x - uniforms.uMouse.value.x) * 0.1;
            uniforms.uMouse.value.y += (y - uniforms.uMouse.value.y) * 0.1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let animationId;
        const clock = new THREE.Clock();

        const animate = () => {
            uniforms.uTime.value = clock.getElapsedTime();
            renderer.render(scene, camera);
            animationId = requestAnimationFrame(animate);
        };
        animate();

        // Resize Handler
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationId);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.7 }}
        />
    );
};

const HeroBackdrop = () => {
    // We are replacing the old slideshow with the premium Liquid Ether effect
    return (
        <>
            <div className="fixed inset-0 bg-aurora-dark z-[-1]"></div> {/* Fallback/Base */}
            <LiquidEther />
            {/* Optional: Add a subtle overlay so text stands out more if the liquid is too bright */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-transparent via-aurora-dark/20 to-aurora-dark/80 pointer-events-none"></div>
        </>
    );
};

// Floating Particles Component
const FloatingParticles = () => {
    const particles = useMemo(() => {
        return Array.from({ length: 20 }, (_, i) => ({
            id: i,
            size: Math.random() * 100 + 50,
            left: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 10 + 15,
            opacity: Math.random() * 0.3 + 0.1,
        }));
    }, []);

    return (
        <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-gradient-to-br from-aurora-green/20 via-aurora-purple/20 to-aurora-blue/20 blur-2xl"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.left}%`,
                        top: '-10%',
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        scale: [1, 1.2, 0.8, 1],
                        opacity: [0, particle.opacity, particle.opacity, 0],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
    );
};

// 3. Gradient Count Up
const GradientCountUp = ({ end, label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = window.Motion.useInView ? window.Motion.useInView(ref, { once: true }) : true; // Fallback if plain hook not avail

    useEffect(() => {
        if (!isInView) return;

        let start = 0;
        const duration = 2000;
        if (end === 0) return;

        const timer = setInterval(() => {
            start += Math.ceil(end / (duration / 30));
            if (start >= end) {
                start = end;
                clearInterval(timer);
            }
            setCount(start);
        }, 30);

        return () => clearInterval(timer);
    }, [end, isInView]);

    return (
        <div ref={ref} className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
            <h3 className="text-5xl font-heading bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                {count}{label.includes("%") ? "" : "+"}
            </h3>
            <p className="text-aurora-green text-sm mt-2 uppercase tracking-widest font-bold">{label}</p>
        </div>
    );
};

// 4. Spotlight Card
const SpotlightCard = ({ title, desc, delay, icon }) => {
    const divRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <motion.div
            ref={divRef}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: delay, duration: 0.5 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className="relative p-8 rounded-2xl bg-black/20 backdrop-blur-md border border-white/10 overflow-hidden group hover:border-aurora-purple/50 transition-all duration-300 h-full hover:transform hover:-translate-y-1"
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity: opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(163, 100, 255, 0.1), transparent 40%)`
                }}
            />
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6 text-2xl border border-white/10 group-hover:bg-aurora-green/20 group-hover:text-aurora-green transition-colors">
                    {icon}
                </div>
                <h4 className="text-2xl font-bold mb-3 text-white font-heading group-hover:text-aurora-green transition-colors">{title}</h4>
                <p className="text-white/60 leading-relaxed font-light">{desc}</p>
            </div>
        </motion.div>
    );
};

// 5. Logo Loop
const LogoLoop = () => {
    // More varied text
    const features = ["No P2W", "Land Claims", "Player Economy", "Events", "Brewery", "Jobs", "Quests", "Dungeons", "Creative PlotWorld"];
    return (
        <div className="w-full overflow-hidden py-4 bg-black/30 backdrop-blur-sm border-y border-white/5 z-20 relative">
            <div className="flex w-max animate-marquee whitespace-nowrap">
                {[...features, ...features, ...features, ...features].map((item, i) => (
                    <span key={i} className="mx-8 text-sm font-bold text-white/40 uppercase tracking-[0.2em] flex items-center gap-4">
                        <span className="w-1 h-1 bg-aurora-green rounded-full"></span> {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

// Main Hero - CENTERED with enhanced animations
const MainHero = () => {
    const [ripples, setRipples] = useState([]);

    const createRipple = (event, buttonId) => {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size,
            buttonId,
        };

        setRipples([...ripples, newRipple]);

        setTimeout(() => {
            setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id));
        }, 600);
    };

    return (
        <main id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-32 pb-20 px-6 z-10 text-center">

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="mb-6"
            >
                <span className="py-2 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-aurora-green text-sm font-bold tracking-widest uppercase animate-float">
                    Welcome to 2026
                </span>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-7xl md:text-9xl font-heading tracking-tighter text-white mb-6 drop-shadow-2xl"
            >
                <motion.span
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    AURORA
                </motion.span>
                <br />
                <motion.span
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-green via-white to-aurora-blue"
                >
                    DAWN
                </motion.span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="max-w-2xl text-xl text-white/90 font-light mb-10 leading-relaxed drop-shadow-lg"
            >
                Immerse yourself in a <span className="text-aurora-green font-normal">beautifully crafted</span> survival experience.
                Where community comes first and the adventure never ends.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col md:flex-row gap-6 items-center"
            >
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                        createRipple(e, 'primary');
                        navigator.clipboard.writeText('play.auroradawn.net');
                        setTimeout(() => alert('IP Copied!'), 100);
                    }}
                    className="relative group px-8 py-4 bg-aurora-green text-aurora-dark font-heading text-lg rounded-full overflow-hidden shadow-[0_0_40px_-10px_rgba(0,210,160,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(0,210,160,0.8)] animate-float-delayed"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Copy Server IP
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                    </span>
                    {ripples
                        .filter((r) => r.buttonId === 'primary')
                        .map((ripple) => (
                            <span
                                key={ripple.id}
                                className="absolute bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x,
                                    top: ripple.y,
                                    width: ripple.size,
                                    height: ripple.size,
                                }}
                            />
                        ))}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => createRipple(e, 'secondary')}
                    className="relative px-8 py-4 bg-white/10 text-white font-heading text-lg rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all flex items-center gap-2 overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        Join Discord
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 3C6.77.5 3.5 1.5 3.5 4.5c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 2.5 12.5c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                    </span>
                    {ripples
                        .filter((r) => r.buttonId === 'secondary')
                        .map((ripple) => (
                            <span
                                key={ripple.id}
                                className="absolute bg-white/30 rounded-full animate-ping"
                                style={{
                                    left: ripple.x,
                                    top: ripple.y,
                                    width: ripple.size,
                                    height: ripple.size,
                                }}
                            />
                        ))}
                </motion.button>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 10, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-10 left-0 right-0 flex justify-center opacity-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 13l5 5 5-5M7 6l5 5 5-5" /></svg>
            </motion.div>
        </main>
    );
};

const StatsSection = () => {
    return (
        <section className="relative z-10 py-20 border-t border-white/5 bg-black/20 backdrop-blur-lg">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                <GradientCountUp end={120} label="Online Now" />
                <GradientCountUp end={365} label="Days Uptime" />
                <GradientCountUp end={15420} label="Registered" />
                <GradientCountUp end={100} label="Uptime %" />
            </div>
        </section>
    );
}

// 6. Two Column Feature Rows with Parallax
const TwoColumnFeatures = () => {
    // Reusable Row Component
    const FeatureRow = ({ img, text, reverse = false }) => {
        const ref = useRef(null);
        const { scrollYProgress } = useScroll({
            target: ref,
            offset: ["start end", "end start"]
        });

        const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
        const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

        return (
            <div ref={ref} className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-20 my-20`}>
                {/* Text Side */}
                <motion.div
                    style={{ opacity: textOpacity }}
                    initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 text-center md:text-left"
                >
                    <p className="text-xl md:text-2xl leading-relaxed font-light text-white/90">
                        {text}
                    </p>
                </motion.div>

                {/* Image Side with Parallax */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotate: reverse ? -2 : 2 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1 relative group"
                >
                    <div className="absolute -inset-2 bg-gradient-to-r from-aurora-green via-aurora-purple to-aurora-blue rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                    <motion.div
                        style={{ y: imageY }}
                        className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
                    >
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.7 }}
                            src={img}
                            alt="Feature"
                            className="w-full h-auto object-cover"
                        />
                        {/* Overlay wash */}
                        <div className="absolute inset-0 bg-aurora-dark/20 group-hover:bg-transparent transition-colors"></div>
                    </motion.div>
                </motion.div>
            </div>
        );
    };

    return (
        <section id="features" className="relative z-10 py-32 px-6 max-w-7xl mx-auto overflow-hidden">
            {/* Background decorations */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/4 left-0 w-96 h-96 bg-aurora-green/10 rounded-full blur-[100px] pointer-events-none"
            ></motion.div>
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                }}
                className="absolute bottom-1/4 right-0 w-96 h-96 bg-aurora-purple/10 rounded-full blur-[100px] pointer-events-none"
            ></motion.div>

            <FeatureRow
                img="./aurora_stock photos/Peaceful-Vanilla-Club-3.jpg"
                text={
                    <>
                        Join a chill, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">community-first</span> survival multiplayer world
                        where progress is earned, builds are meant to last, and the rules are simple, transparent, and consistently enforced.
                    </>
                }
            />

            <FeatureRow
                reverse={true}
                img="./aurora_stock photos/Peaceful-Vanilla-Club-4.jpg"
                text={
                    <>
                        Here you can enjoy a peaceful vanilla experience, with no grief, no pay-to-win vip ranks, no map resets and no PvP
                        outside arenas. Play like you do on single player, but with friends! With no worries. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF9D6C] to-[#BB4E75] font-bold">LGBTQ+ Friendly</span>.
                    </>
                }
            />
        </section>
    );
};

const Footer = () => (
    <footer className="relative z-10 border-t border-white/10 bg-black/80 py-20 text-center overflow-hidden">
        {/* Animated wave effect */}
        <motion.div
            className="absolute top-0 left-0 right-0 h-24 opacity-20"
            animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
            }}
            style={{
                background: 'linear-gradient(90deg, #00D2A0, #A364FF, #4B9EFF, #00D2A0)',
                backgroundSize: '200% 100%',
            }}
        />

        <div className="relative z-10">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <h2 className="text-3xl font-heading text-white mb-2">Join the Adventure</h2>
                <motion.p
                    animate={{
                        opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-aurora-green mt-2 font-bold tracking-wider"
                >
                    play.auroradawn.net
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex justify-center gap-8 mb-12 text-sm font-bold tracking-widest text-white/60"
            >
                <motion.a
                    whileHover={{ scale: 1.1, color: '#00D2A0' }}
                    href="#"
                    className="hover:text-aurora-green transition-colors"
                >
                    DISCORD
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.1, color: '#00D2A0' }}
                    href="#"
                    className="hover:text-aurora-green transition-colors"
                >
                    STORE
                </motion.a>
                <motion.a
                    whileHover={{ scale: 1.1, color: '#00D2A0' }}
                    href="#"
                    className="hover:text-aurora-green transition-colors"
                >
                    VOTE
                </motion.a>
            </motion.div>

            <p className="text-white/20 text-xs">&copy; 2026 Aurora Dawn SMP. Not affiliated with Mojang AB.</p>
        </div>
    </footer>
);

const App = () => {
    return (
        <div className="min-h-screen text-aurora-text overflow-x-hidden selection:bg-aurora-green selection:text-aurora-dark">
            <Navbar />
            <HeroBackdrop /> {/* Slideshow Background */}
            <MainHero />
            <LogoLoop />
            <StatsSection />
            <TwoColumnFeatures />
            <Footer />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
