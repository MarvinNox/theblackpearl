import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote:
      "The Black Pearl delivered beyond expectations. The design was sharp, delivery was on time, and the team communicated clearly every step of the way.",
    name: "Jacopo Marchesoni",
    role: "CEO, Tenjou Studio",
    country: "Portugal",
  },
  {
    quote:
      "Working with them felt like having an in-house team. They understood our brand instantly and translated it into a product our customers love.",
    name: "Igor Chernukhin",
    role: "Founder, Hills Avenue",
    country: "Ukraine",
  },
  {
    quote:
      "Fast, professional, and deeply thoughtful in their approach. Cochefy's app wouldn't be what it is without their UX expertise.",
    name: "Felix Braun",
    role: "Product Lead, Cochefy",
    country: "Germany",
  },
];

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () =>
    setActive((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[active];

  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="What clients say" heading="Testimonials" />

        <div className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-20 items-end">
          {/* Quote block */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                {/* Opening quote mark */}
                <div
                  className="font-heading text-[6rem] leading-none text-foreground/10 select-none mb-4"
                  aria-hidden="true"
                >
                  "
                </div>

                <blockquote className="font-heading font-semibold text-[clamp(1.2rem,2.5vw,2rem)] leading-[1.4] tracking-tight text-pearl max-w-3xl">
                  {t.quote}
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  <div className="w-px h-8 bg-foreground/20" />
                  <div>
                    <p className="font-heading font-semibold text-sm text-pearl">
                      {t.name}
                    </p>
                    <p className="font-mono text-xs tracking-wider text-mercury mt-0.5">
                      {t.role} · {t.country}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 md:flex-col md:items-end">
            {/* Counter */}
            <span className="font-mono text-xs text-mercury tracking-wider mr-2 md:mr-0 md:mb-4">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-mercury hover:border-foreground/40 hover:text-pearl transition-all duration-300"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-foreground/15 flex items-center justify-center text-mercury hover:border-foreground/40 hover:text-pearl transition-all duration-300"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2 mt-12">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-px transition-all duration-300 ${i === active ? "w-10 bg-foreground/60" : "w-4 bg-foreground/15"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
