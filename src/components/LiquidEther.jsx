import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import useIsMobile from '../hooks/useIsMobile';

const LiquidEther = ({
  className = '',
  colors = ['#00D2A0', '#A364FF', '#4B9EFF'], // Aurora: Green, Purple, Blue
}) => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile || !containerRef.current) return;
    console.log("Soft Aurora: Initializing...");

    // --- 1. Setup Scene ---
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(renderer.domElement);

    // --- 2. "Soft Mesh Gradient" Shader ---
    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform vec3 uColor3;

      varying vec2 vUv;

      // Simple smooth noise (3D to allow 2D + time)
      // We don't need expensive FBM, just smooth gradients
      
      void main() {
        vec2 st = vUv;
        // Correct aspect ratio
        float aspect = uResolution.x / uResolution.y;
        st.x *= aspect;

        // Time factor for slow drift
        float t = uTime * 0.4;

        // 1. Moving Light Sources (Blob centers)
        // Green Blob
        vec2 p1 = vec2(0.5 * aspect, 0.5) + vec2(cos(t * 0.5), sin(t * 0.3)) * 0.4;
        // Purple Blob
        vec2 p2 = vec2(0.5 * aspect, 0.5) + vec2(sin(t * 0.8), cos(t * 0.5)) * 0.5;
        // Blue Blob (follows mouse slightly)
        vec2 mouse = uMouse * vec2(aspect, 1.0);
        vec2 p3 = vec2(0.5 * aspect, 0.5) + vec2(sin(t * 0.2), cos(t * 0.9)) * 0.3;
        
        // Gentle mouse interaction
        p3 = mix(p3, mouse, 0.2); 

        // 2. Distance Fields (Softness)
        float d1 = length(st - p1);
        float d2 = length(st - p2);
        float d3 = length(st - p3);

        // 3. Create Glows (Inverse distance)
        // The higher the divisor, the softer the edge
        float g1 = 0.6 / (d1 + 0.5); 
        float g2 = 0.5 / (d2 + 0.5);
        float g3 = 0.55 / (d3 + 0.5);

        // 4. Mix Colors Additively
        // Start with deep background
        vec3 col = vec3(0.01, 0.01, 0.02); // Deep Aurora Dark

        col += uColor1 * g1 * 0.6; // Green
        col += uColor2 * g2 * 0.5; // Purple
        col += uColor3 * g3 * 0.6; // Blue

        // 5. Add subtle Grain for realism (dither)
        float noise = fract(sin(dot(vUv * uTime, vec2(12.9898, 78.233))) * 43758.5453);
        col += (noise - 0.5) * 0.03;

        // 6. Smooth contrast
        col = smoothstep(0.0, 1.2, col);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColor1: { value: new THREE.Color(colors[0]) },
      uColor2: { value: new THREE.Color(colors[1]) },
      uColor3: { value: new THREE.Color(colors[2]) },
    };

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = vec4(position, 1.0); 
            }
        `,
      fragmentShader
    });

    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    // --- 3. Animation ---
    const clock = new THREE.Clock();
    let rAF;

    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      rAF = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };

    const handleMouse = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight);
      uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(rAF);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [JSON.stringify(colors), isMobile]);

  if (isMobile) return null;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[-1] pointer-events-none ${className}`}
      style={{ opacity: 1.0 }}
    ></div>
  );
};

export default LiquidEther;
