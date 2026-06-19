import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionLabel from './SectionLabel';

const steps = [
  { num: '01', title: 'Fill the form', description: 'Tell us about your project — what you need, your timeline, and your goals. It takes under 3 minutes.' },
  { num: '02', title: 'Discovery call', description: 'We reach out within 24 hours for a short call or message exchange to understand your request in depth.' },
  { num: '03', title: 'Scope & timeline', description: 'We map out the full project scope, define deliverables, and calculate realistic timelines and budget.' },
  { num: '04', title: 'Wireframes', description: 'We build low-fidelity wireframes to align on structure and user flows before any visual design begins.' },
  { num: '05', title: 'Design concept', description: 'Our designers develop the visual concept — colour systems, typography, components, and the overall feel.' },
  { num: '06', title: 'Design presentation', description: 'We present the full design and incorporate your feedback through focused revision rounds.' },
  { num: '07', title: 'Development handoff', description: 'Approved designs are handed off to our developers with detailed specs, assets, and interaction notes.' },
  { num: '08', title: 'Launch', description: 'Your product goes live. We handle final QA, deployment, and stay available for post-launch support.' },
];

export default function ProcessSection() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="How we work" heading="From first message to final launch" />

        <div className="relative">
          <div className="hidden md:block absolute left-[3.25rem] top-0 bottom-0 w-px bg-foreground/8" />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const isActive = activeStep === i;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => setActiveStep(isActive ? null : i)}
                  className="relative flex items-start gap-6 md:gap-10 py-6 md:py-7 border-b border-foreground/8 cursor-pointer group"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 z-10 ${
                    isActive ? 'border-foreground/60 bg-foreground/10' : 'border-foreground/15 bg-void group-hover:border-foreground/30'
                  }`}>
                    <span className={`font-mono text-xs transition-colors duration-300 ${isActive ? 'text-pearl' : 'text-mercury'}`}>
                      {step.num}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0 pt-1.5">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className={`font-heading font-semibold text-lg md:text-xl tracking-tight transition-colors duration-300 ${
                        isActive ? 'text-pearl' : 'text-foreground/70 group-hover:text-pearl'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`flex-shrink-0 font-mono text-xs text-mercury/40 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}>
                        ↓
                      </span>
                    </div>

                    <div className={`overflow-hidden transition-all duration-400 ${isActive ? 'max-h-32 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                      <p className="font-body text-sm leading-relaxed text-mercury">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}