import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import SectionLabel from './SectionLabel';

const packages = [
  {
    name: 'Landing',
    price: 'From $3,000',
    description: 'A single high-impact page designed to convert.',
    features: ['Custom UI/UX Design', 'Responsive Development', 'Basic SEO Setup', 'Content Integration', '2 Revision Rounds'],
  },
  {
    name: 'Product',
    price: 'From $8,000',
    description: 'Full digital product — from concept to deployment.',
    features: ['UX Research & Strategy', 'Complete UI Design System', 'Frontend & Backend Development', 'CMS Integration', 'Performance Optimisation', 'Project Management'],
    highlighted: true,
  },
  {
    name: 'Ongoing',
    price: 'From $4,000/mo',
    description: 'Dedicated team as your long-term digital partner.',
    features: ['Continuous Design & Dev Support', 'Priority Response', 'Monthly Strategy Calls', 'Analytics & Reporting', 'Iterative Improvements'],
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="How much" heading="Pricing packages" />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`relative group p-8 md:p-10 rounded-xl border transition-all duration-500 ${
                pkg.highlighted
                  ? 'border-foreground/30 bg-foreground/[0.03]'
                  : 'border-foreground/10 hover:border-foreground/20'
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute -top-px left-8 right-8 h-px gradient-prism" />
              )}

              <div className="font-mono text-xs tracking-widest uppercase text-mercury mb-2">
                {pkg.name}
              </div>
              <div className="font-heading font-semibold text-3xl md:text-4xl text-pearl tracking-tight">
                {pkg.price}
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-mercury">
                {pkg.description}
              </p>

              <ul className="mt-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-mercury flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm text-pearl/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-10 w-full inline-flex items-center justify-center gap-2 px-6 py-3 border border-foreground/20 rounded-full font-mono text-xs tracking-wider uppercase text-pearl hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Get started
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}