const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import SectionLabel from './SectionLabel';

export const projects = [
  {
    id: 'hills-avenue',
    title: 'Hills Avenue',
    category: 'Landing Page · Branding',
    country: 'Ukraine',
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/11bbe76c5_generated_10be0da1.png',
  },
  {
    id: 'tenjou-studio',
    title: 'Tenjou Studio',
    category: 'E-Commerce · Web App',
    country: 'Italy',
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/1c7d6715e_generated_446e1132.png',
  },
  {
    id: 'cochefy',
    title: 'Cochefy',
    category: 'Mobile App · UX Research',
    country: 'Germany',
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/85f58e2e9_generated_1f830d91.png',
  },
  {
    id: 'tenjou-studio-pt',
    title: 'Tenjou Studio',
    category: 'Custom CMS · Development',
    country: 'Portugal',
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/1fd8834c8_generated_88a5ddf3.png',
  },
  {
    id: 'aether-sound',
    title: 'Aether Sound',
    category: 'Landing Page · Performance',
    country: null,
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/5936f6690_generated_6239afdf.png',
  },
  {
    id: 'void-architecture',
    title: 'Void Architecture',
    category: 'Full Platform · Design System',
    country: null,
    image: 'https://media.db.com/images/public/6a087fdf2c70eb41f2dc8670/5bd10915a_generated_eade7ca2.png',
  },
];

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
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
              viewport={{ once: true, margin: '-60px' }}
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
                    <div className="w-9 h-9 rounded-full border border-foreground/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <ArrowUpRight className="w-4 h-4 text-pearl" />
                    </div>
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
            viewport={{ once: true, margin: '-60px' }}
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