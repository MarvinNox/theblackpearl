import React, { useRef, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Eye } from 'lucide-react';
import * as THREE from 'three';

function PearlScene() {
  const mountRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Pearl sphere
    const geometry = new THREE.SphereGeometry(1.2, 128, 128);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      metalness: 0.95,
      roughness: 0.05,
      envMapIntensity: 1.5,
    });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x222222, 0.5);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0xf2f2f2, 2, 20);
    light1.position.set(3, 3, 3);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x4488aa, 1.5, 20);
    light2.position.set(-3, -2, 2);
    scene.add(light2);

    const light3 = new THREE.PointLight(0x808080, 1, 20);
    light3.position.set(0, 4, -3);
    scene.add(light3);

    // Mouse interaction
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Reduced motion check
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!prefersReducedMotion) {
        sphere.rotation.y += 0.003;
        sphere.rotation.x += 0.001;
        light1.position.x = 3 + mouseRef.current.x * 2;
        light1.position.y = 3 + mouseRef.current.y * 2;
      }
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" />;
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-void">
      {/* 3D Pearl */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[min(60vw,500px)] h-[min(60vw,500px)] pointer-events-auto">
          <PearlScene />
        </div>
      </div>

      {/* Headline - Top */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 pt-28 md:pt-36 px-6 md:px-10"
      >
        <h1 className="font-heading font-semibold text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] tracking-tight text-pearl uppercase">
          We build
          <br />
          <span className="text-mercury">digital</span>
          <br />
          experiences
        </h1>
      </motion.div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-auto pb-10 md:pb-16 px-6 md:px-10 flex flex-col md:flex-row items-end justify-between gap-8">
        {/* Subtext - Bottom Left */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-mono text-xs md:text-sm leading-relaxed text-mercury max-w-md"
        >
          Full-cycle team: design, development, and management —
          <br className="hidden md:block" />
          working as one system. We're creating strategic digital products.
        </motion.p>

        {/* CTAs - Bottom Right */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background rounded-full font-mono text-xs tracking-wider uppercase hover:gap-5 transition-all duration-300"
          >
            Start
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#portfolio"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-foreground/20 text-pearl rounded-full font-mono text-xs tracking-wider uppercase hover:border-foreground/60 transition-all duration-300"
          >
            View
            <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-foreground/30" />
      </motion.div>
    </section>
  );
}