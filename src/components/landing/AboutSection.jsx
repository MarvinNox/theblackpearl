import React from "react";
import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-32 md:py-44 px-6 md:px-10 bg-void"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="Who we are" />

        {/* Big statement */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-heading font-semibold text-[clamp(1.5rem,3.5vw,3rem)] leading-[1.2] tracking-tight text-pearl max-w-5xl"
        >
          We're a small team of creatives and developers partnering with clients
          worldwide to build thoughtful digital experiences
        </motion.p>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 font-body text-base md:text-lg leading-relaxed text-mercury max-w-2xl"
        >
          We choose depth over volume, fast collaboration over endless calls,
          and solutions that move businesses forward.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mt-20 h-px bg-gradient-to-r from-foreground/10 via-foreground/20 to-transparent origin-left"
        />
      </div>
    </section>
  );
}
