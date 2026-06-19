import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable section label + optional heading block.
 * label     — small mono uppercase text (with dot prefix)
 * heading   — optional large h2
 * className — extra classes on the wrapper
 */
export default function SectionLabel({ label, heading, className = '' }) {
  return (
    <div className={`mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-4"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-mercury flex-shrink-0" />
        <span className="font-mono text-xs tracking-widest uppercase text-mercury">
          {label}
        </span>
      </motion.div>

      {heading && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-heading font-bold text-[clamp(2.5rem,6vw,5.5rem)] tracking-tight text-pearl leading-[1.05]"
        >
          {heading}
        </motion.h2>
      )}
    </div>
  );
}