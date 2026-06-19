import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SectionLabel from './SectionLabel';

const pins = [
  {
    id: 'hills-avenue',
    project: 'Hills Avenue',
    country: 'Ukraine',
    category: 'Landing Page · Branding',
    x: 568,
    y: 153,
  },
  {
    id: 'tenjou-studio',
    project: 'Tenjou Studio',
    country: 'Italy',
    category: 'E-Commerce · Web App',
    x: 510,
    y: 178,
  },
  {
    id: 'cochefy',
    project: 'Cochefy',
    country: 'Germany',
    category: 'Mobile App · UX Research',
    x: 505,
    y: 148,
  },
  {
    id: 'tenjou-studio-pt',
    project: 'Tenjou Studio',
    country: 'Portugal',
    category: 'Custom CMS · Development',
    x: 460,
    y: 180,
  },
];

function scrollToProject(id) {
  const el = document.getElementById(`project-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    el.classList.add('ring-1', 'ring-white/40');
    setTimeout(() => el.classList.remove('ring-1', 'ring-white/40'), 2000);
  }
}

export default function MapSection() {
  const [activePin, setActivePin] = useState(null);

  const handlePinClick = (pin) => {
    setActivePin(pin.id === activePin ? null : pin.id);
  };

  const handleGoToProject = (id) => {
    setActivePin(null);
    setTimeout(() => scrollToProject(id), 100);
  };

  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 bg-void">
      <div className="max-w-[1440px] mx-auto">
        <SectionLabel label="Where we work" heading="Clients across the globe" />

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full rounded-xl border border-foreground/10 overflow-hidden"
          style={{ background: '#070707' }}
        >
          <svg
            viewBox="0 0 1000 500"
            className="w-full"
            style={{ display: 'block' }}
            aria-label="World map with project locations"
          >
            {/* Outline-only world map */}
            <g fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.8" strokeLinejoin="round">
              {/* North America */}
              <path d="M80,80 L200,70 L230,90 L240,120 L220,160 L200,180 L180,200 L160,220 L130,230 L100,210 L70,190 L60,160 L55,130 L65,100 Z" />
              <path d="M85,230 L130,230 L160,250 L170,270 L150,290 L120,295 L90,280 L75,255 Z" />
              {/* Greenland */}
              <path d="M220,50 L260,40 L275,55 L265,75 L240,80 L220,70 Z" />
              {/* South America */}
              <path d="M160,290 L200,280 L220,300 L230,340 L225,380 L210,410 L190,430 L170,420 L155,390 L145,350 L140,310 Z" />
              {/* Europe */}
              <path d="M440,80 L500,75 L530,85 L545,100 L535,120 L520,130 L510,145 L495,150 L480,155 L465,145 L450,135 L440,115 L435,95 Z" />
              {/* UK */}
              <path d="M455,95 L470,88 L475,100 L465,110 L453,108 Z" />
              {/* Scandinavia */}
              <path d="M490,55 L510,50 L525,65 L520,85 L505,90 L490,80 Z" />
              {/* Africa */}
              <path d="M460,165 L520,160 L545,175 L560,210 L565,260 L555,310 L535,350 L510,370 L480,365 L455,340 L440,300 L435,260 L440,210 L450,180 Z" />
              {/* Asia */}
              <path d="M545,70 L660,60 L750,65 L820,80 L860,100 L870,130 L850,160 L820,175 L780,180 L740,185 L700,190 L660,195 L630,200 L600,195 L570,185 L550,170 L540,150 L535,120 L538,95 Z" />
              {/* Middle East */}
              <path d="M550,175 L600,170 L620,185 L625,205 L610,220 L585,225 L560,215 L548,200 Z" />
              {/* India */}
              <path d="M615,185 L650,180 L665,200 L660,230 L645,255 L625,260 L610,245 L605,220 L608,200 Z" />
              {/* SE Asia */}
              <path d="M700,185 L740,180 L760,195 L755,215 L735,225 L710,220 L695,205 Z" />
              {/* Australia */}
              <path d="M720,290 L790,280 L830,295 L840,330 L830,360 L800,375 L760,370 L725,350 L710,320 Z" />
              {/* Japan */}
              <path d="M800,130 L820,125 L830,138 L822,150 L807,148 Z" />
              {/* Russia */}
              <path d="M545,55 L600,45 L700,40 L800,45 L870,60 L880,80 L860,100 L800,95 L720,90 L640,88 L560,90 L545,75 Z" />
              {/* NZ */}
              <path d="M870,360 L880,355 L885,368 L876,375 Z" />
              {/* Madagascar */}
              <path d="M580,300 L590,295 L596,310 L590,325 L580,320 Z" />
            </g>

            {pins.map((pin) => (
              <line
                key={`line-${pin.id}`}
                x1={pin.x} y1={pin.y}
                x2="500" y2="250"
                stroke="#ffffff" strokeWidth="0.3"
                strokeDasharray="3 6" opacity="0.06"
              />
            ))}

            {pins.map((pin) => {
              const isActive = activePin === pin.id;
              return (
                <g
                  key={pin.id}
                  onClick={() => handlePinClick(pin)}
                  style={{ cursor: 'pointer' }}
                  role="button"
                  aria-label={`${pin.project} — ${pin.country}`}
                >
                  <circle cx={pin.x} cy={pin.y} r={isActive ? 14 : 10}
                    fill="none" stroke="#F2F2F2" strokeWidth="0.5"
                    opacity={isActive ? 0.5 : 0.2}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <circle cx={pin.x} cy={pin.y} r={isActive ? 5 : 3.5}
                    fill="#F2F2F2" opacity={isActive ? 1 : 0.6}
                    style={{ transition: 'all 0.3s' }}
                  />
                  <text
                    x={pin.x + 10} y={pin.y - 8}
                    fontSize="8" fill="#808080"
                    fontFamily="JetBrains Mono, monospace"
                    opacity={isActive ? 1 : 0.5}
                    style={{ transition: 'opacity 0.3s', userSelect: 'none', pointerEvents: 'none' }}
                  >
                    {pin.country}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {activePin && (() => {
              const pin = pins.find((p) => p.id === activePin);
              if (!pin) return null;
              return (
                <motion.div
                  key={activePin}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.25 }}
                  className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-xl border border-foreground/20 rounded-xl p-5 flex items-center gap-5 shadow-2xl"
                >
                  <div>
                    <p className="font-mono text-xs tracking-widest uppercase text-mercury mb-1">{pin.country}</p>
                    <h4 className="font-heading font-semibold text-lg text-pearl leading-tight">{pin.project}</h4>
                    <p className="font-mono text-xs text-mercury mt-1">{pin.category}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleGoToProject(pin.id)}
                      className="px-4 py-2 bg-foreground text-background rounded-full font-mono text-xs tracking-wider uppercase hover:opacity-80 transition-opacity whitespace-nowrap"
                    >
                      View project
                    </button>
                    <button
                      onClick={() => setActivePin(null)}
                      className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-mercury hover:text-pearl transition-colors"
                      aria-label="Close"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          <div className="absolute top-5 right-5">
            <span className="font-mono text-xs text-foreground/25 tracking-wider">Click pins to explore</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}