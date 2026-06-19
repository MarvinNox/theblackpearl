import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Code2, ClipboardList } from 'lucide-react';
import SectionLabel from './SectionLabel';

const services = [
  {
    num: '01',
    title: 'Design',
    icon: Palette,
    items: ['UX Research', 'Wireframes', 'UI Design'],
  },
  {
    num: '02',
    title: 'Development',
    icon: Code2,
    items: ['Web Development', 'CMS / Custom Builds', 'Performance Optimisation', 'Integrations'],
  },
  {
    num: '03',
    title: 'Project Management',
    icon: ClipboardList,
    items: ['Clear Timelines', 'Structured Communication', 'Delivery Control'],
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="services" className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="What we do" heading="Our services" />

        {/* Services table */}
        <dl className="border-t border-foreground/10">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={service.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="border-b border-foreground/10 group cursor-default"
              >
                <div className={`flex items-center gap-6 md:gap-10 py-10 md:py-14 transition-all duration-500 ${isHovered ? 'md:py-16' : ''}`}>
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isHovered ? 'border-foreground/40 bg-foreground/5' : 'border-foreground/10'
                  }`}>
                    <Icon className={`w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-pearl' : 'text-mercury'}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <dt className="font-heading font-semibold text-2xl md:text-4xl tracking-tight text-pearl">
                      {service.title}
                    </dt>
                    <dd className={`mt-3 flex flex-wrap gap-x-4 gap-y-1 transition-all duration-500 overflow-hidden ${
                      isHovered ? 'max-h-40 opacity-100' : 'max-h-0 md:max-h-40 opacity-0 md:opacity-100'
                    }`}>
                      {service.items.map((item, j) => (
                        <span key={j} className="font-mono text-xs tracking-wider text-mercury">
                          {item}
                          {j < service.items.length - 1 && <span className="ml-4 text-foreground/20">·</span>}
                        </span>
                      ))}
                    </dd>
                  </div>

                  {/* Number */}
                  <span className={`flex-shrink-0 font-mono text-4xl md:text-6xl font-light tracking-tighter transition-colors duration-300 ${
                    isHovered ? 'text-foreground/30' : 'text-foreground/10'
                  }`}>
                    {service.num}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}