import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";

const team = [
  {
    role: "Project Manager",
    name: "Ihor Torshyn",
    photo:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783338493/b2f6935b-dfa0-481b-b268-5f5d06884858_fobe6s.jpg",
  },
  {
    role: "Developer",
    name: "Sofia Kindratyshyn",
    photo: "https://avatars.githubusercontent.com/u/187766232?v=4",
  },
  {
    role: "Developer",
    name: "Danyil Hnatiuk-Shapova",
    photo:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783357785/5359819044963425720_xs79fr.jpg",
  },
  {
    role: "Developer",
    name: "Denys Tkachenko",
    photo: "https://avatars.githubusercontent.com/u/90721671?v=4",
  },
  {
    role: "UX/UI Designer",
    name: "Kateryna Honska",
    photo:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783338492/ea723485-64ba-4429-9c2c-a79500672e42_foxoii.jpg",
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
