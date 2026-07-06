import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import SectionLabel from "./SectionLabel";

export const projects = [
  {
    id: "hills-avenue",
    title: "Hills Avenue",
    category: "Landing Page · Branding",
    country: "Ukraine",
    image:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783337458/Frame_21_p0aazp.png",
    url: "https://hillsavenue.com.ua/",
  },
  {
    id: "tenjou-studio",
    title: "Tenjou Studio",
    category: "Landing Page · Branding",
    country: "Portugal",
    image:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783337456/Frame_24_bczb9c.png",
    url: "https://tenjoustudio.com/",
  },
  {
    id: "cochefy",
    title: "Cochefy",
    category: "Mobile App · UX Research",
    country: "Germany",
    image:
      "https://res.cloudinary.com/marvin-nox/image/upload/v1783337455/image_2_nowxvh.png",
    url: "https://www.cochefy.io/",
  },
];

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative py-32 md:py-44 px-6 md:px-10 bg-void"
    >
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="What we've done" heading="Selected projects" />

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              id={`project-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-xl border border-foreground/10 hover:border-foreground/25 cursor-pointer transition-colors duration-300"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="font-heading font-semibold text-lg text-pearl leading-tight">
                        {project.title}
                      </h3>
                      <p className="font-mono text-xs tracking-wider text-mercury mt-1">
                        {project.category}
                      </p>
                      {project.country && (
                        <p className="font-mono text-xs tracking-wider text-foreground/40 mt-0.5">
                          {project.country}
                        </p>
                      )}
                    </div>
                    <a
                      href={project.url}
                      aria-label={project.title}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
                    >
                      <ArrowUpRight className="w-4 h-4 text-pearl" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Add your project card */}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: projects.length * 0.1 }}
            className="group relative rounded-xl border border-dashed border-foreground/15 hover:border-foreground/30 cursor-pointer transition-all duration-300 aspect-[4/3] flex flex-col items-center justify-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border border-foreground/20 group-hover:border-foreground/40 flex items-center justify-center transition-all duration-300">
              <Plus className="w-5 h-5 text-mercury group-hover:text-pearl transition-colors duration-300" />
            </div>
            <span className="font-mono text-xs tracking-widest uppercase text-mercury group-hover:text-pearl transition-colors duration-300">
              Add your project
            </span>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
