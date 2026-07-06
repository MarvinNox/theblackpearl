import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";

const team = [
  {
    role: "Project Manager",
    name: "Sofia Marchetti",
    photo:
      "https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/bc214018c_generated_image.png",
  },
  {
    role: "Frontend Developer",
    name: "Liam Novak",
    photo:
      "https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/b5e0a6326_generated_image.png",
  },
  {
    role: "Backend Developer",
    name: "Marcus Rein",
    photo:
      "https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/e55077699_generated_image.png",
  },
  {
    role: "Backend Developer",
    name: "Daniel Ostroff",
    photo:
      "https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/d1530ed72_generated_image.png",
  },
  {
    role: "UX/UI Designer",
    name: "Elina Park",
    photo:
      "https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/165c2c2d8_generated_image.png",
  },
];

export default function TeamSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section
      id="team"
      className="relative py-32 md:py-44 px-6 md:px-10 bg-void"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="Who builds it" heading="The team" />

        {/* Table */}
        <div className="border-t border-foreground/10">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative border-b border-foreground/10 group cursor-default overflow-hidden"
            >
              {/* Photo — absolute, fades in on hover */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    key="photo"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 z-0 pointer-events-none"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "brightness(0.18) saturate(0.3)" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-background/80" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Row content */}
              <div className="relative z-10 flex items-center justify-between gap-6 py-8 md:py-10 px-2">
                {/* Role */}
                <span
                  className={`font-mono text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 ${
                    hoveredIndex === i ? "text-mercury" : "text-foreground/30"
                  }`}
                >
                  {member.role}
                </span>

                {/* Name */}
                <span
                  className={`font-heading font-semibold text-2xl md:text-4xl tracking-tight transition-colors duration-300 text-right ${
                    hoveredIndex === i ? "text-pearl" : "text-foreground/60"
                  }`}
                >
                  {member.name}
                </span>
              </div>

              {/* Slide-in photo thumbnail on hover (right side, desktop) */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    key="thumb"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-0 top-0 bottom-0 w-24 md:w-36 z-20 hidden md:block pointer-events-none"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      style={{ borderLeft: "1px solid rgba(255,255,255,0.06)" }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
