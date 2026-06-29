import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import SectionLabel from "./SectionLabel";

const MAP_VIEWBOX = "30.767 241.591 784.077 458.627";
const MAP_ASPECT = 784.077 / 458.627;
const MAP_CENTER_X = 422.805;
const MAP_CENTER_Y = 470.904;

const pins = [
  {
    id: "hills-avenue",
    project: "Hills Avenue",
    country: "Ukraine",
    countryCode: "ua",
    category: "Landing Page · Branding",
    x: 474,
    y: 394,
  },
  {
    id: "tenjou-studio",
    project: "Tenjou Studio",
    country: "Italy",
    countryCode: "it",
    category: "E-Commerce · Web App",
    x: 432,
    y: 416,
  },
  {
    id: "cochefy",
    project: "Cochefy",
    country: "Germany",
    countryCode: "de",
    category: "Mobile App · UX Research",
    x: 431,
    y: 389,
  },
  {
    id: "tenjou-studio-pt",
    project: "Tenjou Studio",
    country: "Portugal",
    countryCode: "pt",
    category: "Custom CMS · Development",
    x: 388,
    y: 429,
  },
];

function scrollToProject(id) {
  const el = document.getElementById(`project-${id}`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.classList.add("ring-1", "ring-white/40");
    setTimeout(() => el.classList.remove("ring-1", "ring-white/40"), 2000);
  }
}

export default function MapSection() {
  const [activePin, setActivePin] = useState(null);
  const mapRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const activePinData = pins.find((p) => p.id === activePin) || null;

  const disabledCountries = useMemo(() => ["ru"], []);

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      try {
        const res = await fetch("/world-map.svg");
        const svgText = await res.text();

        if (!isMounted || !mapRef.current) return;

        mapRef.current.innerHTML = svgText;

        const svgEl = mapRef.current.querySelector("svg");

        if (svgEl) {
          svgEl.setAttribute("width", "100%");
          svgEl.setAttribute("height", "100%");
          svgEl.setAttribute("viewBox", MAP_VIEWBOX);
          svgEl.setAttribute("preserveAspectRatio", "xMidYMid meet");
          svgEl.removeAttribute("x");
          svgEl.removeAttribute("y");
        }

        setMapLoaded(true);
      } catch (error) {
        console.error("Failed to load SVG map:", error);
      }
    }

    loadMap();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return;

    const mapRoot = mapRef.current;
    const countries = mapRoot.querySelectorAll(
      "#world-map > g > path[id], #world-map > g > g[id]",
    );

    countries.forEach((el) => {
      const id = el.id.toLowerCase();

      el.classList.remove("is-hovered", "is-active-country", "is-disabled");

      if (disabledCountries.includes(id)) {
        el.classList.add("is-disabled");
        return;
      }

      if (activePinData?.countryCode?.toLowerCase() === id) {
        el.classList.add("is-active-country");
      }
    });
  }, [mapLoaded, activePinData, disabledCountries]);

  const handlePinClick = (pin) => {
    setActivePin(pin.id === activePin ? null : pin.id);
  };

  const handleGoToProject = (id) => {
    setActivePin(null);
    setTimeout(() => scrollToProject(id), 100);
  };

  return (
    <section className="relative bg-void px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1440px]">
        <SectionLabel
          label="Where we work"
          heading="Clients across the globe"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full overflow-hidden rounded-xl border border-foreground/10 bg-[#070707]"
        >
          <style>{`
  #world-map {
    width: 100%;
    height: 100%;
    display: block;
  }

  #world-map > g > path[id],
  #world-map > g > g[id] path {
    fill: transparent;
    stroke: rgba(255, 255, 255, 0.18);
    stroke-width: 1;
    pointer-events: all;
    transition:
      fill 0.25s ease,
      stroke 0.25s ease,
      opacity 0.25s ease;
  }

  #world-map > g > path[id]:not(.is-disabled),
  #world-map > g > g[id]:not(.is-disabled) {
    cursor: pointer;
  }

  #world-map > g > path[id]:not(.is-disabled):not(.is-active-country):hover,
  #world-map > g > g[id]:not(.is-disabled):not(.is-active-country):hover path {
    fill: rgba(255, 255, 255, 0.03);
    stroke: rgba(255, 255, 255, 0.42);
  }

  #world-map > g > path[id].is-active-country,
  #world-map > g > g[id].is-active-country path {
    fill: rgba(255, 255, 255, 0.10);
    stroke: rgba(255, 255, 255, 0.78);
  }

  #world-map > g > path[id].is-disabled,
  #world-map > g > g[id].is-disabled path {
    fill: transparent;
    stroke: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    cursor: default;
  }
`}</style>

          <div
            className="relative w-full"
            style={{ aspectRatio: `${MAP_ASPECT}` }}
          >
            <div
              ref={mapRef}
              className="absolute inset-0 flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
              aria-label="World map with project locations"
            />

            <svg
              viewBox={MAP_VIEWBOX}
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              {pins.map((pin) => (
                <line
                  key={`line-${pin.id}`}
                  x1={pin.x}
                  y1={pin.y}
                  x2={MAP_CENTER_X}
                  y2={MAP_CENTER_Y}
                  stroke="#ffffff"
                  strokeWidth="0.3"
                  strokeDasharray="3 6"
                  opacity="0.06"
                />
              ))}

              {pins.map((pin) => {
                const isActive = activePin === pin.id;

                return (
                  <g
                    key={pin.id}
                    onClick={() => handlePinClick(pin)}
                    className="cursor-pointer"
                    role="button"
                    aria-label={`${pin.project} — ${pin.country}`}
                  >
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isActive ? 8 : 5.5}
                      fill="none"
                      stroke="#F2F2F2"
                      strokeWidth="0.5"
                      opacity={isActive ? 0.5 : 0.2}
                      style={{ transition: "all 0.3s" }}
                    />
                    <circle
                      cx={pin.x}
                      cy={pin.y}
                      r={isActive ? 2.8 : 2}
                      fill="#F2F2F2"
                      opacity={isActive ? 1 : 0.6}
                      style={{ transition: "all 0.3s" }}
                    />
                    <text
                      x={pin.x + 6}
                      y={pin.y - 6}
                      fontSize="6"
                      fill="#808080"
                      fontFamily="JetBrains Mono, monospace"
                      opacity={isActive ? 1 : 0.5}
                      style={{
                        transition: "opacity 0.3s",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {pin.country}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <AnimatePresence>
            {activePinData && (
              <motion.div
                key={activePinData.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-6 left-6 flex max-w-[calc(100%-3rem)] items-center gap-5 rounded-xl border border-foreground/20 bg-background/95 p-5 shadow-2xl backdrop-blur-xl"
              >
                <div>
                  <p className="mb-1 font-mono text-xs uppercase tracking-widest text-mercury">
                    {activePinData.country}
                  </p>
                  <h4 className="font-heading text-lg font-semibold leading-tight text-pearl">
                    {activePinData.project}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-mercury">
                    {activePinData.category}
                  </p>
                </div>

                <div className="ml-4 flex items-center gap-2">
                  <button
                    onClick={() => handleGoToProject(activePinData.id)}
                    className="whitespace-nowrap rounded-full bg-foreground px-4 py-2 font-mono text-xs uppercase tracking-wider text-background transition-opacity hover:opacity-80"
                  >
                    View project
                  </button>

                  <button
                    onClick={() => setActivePin(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 text-mercury transition-colors hover:text-pearl"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="absolute right-5 top-5">
            <span className="font-mono text-xs tracking-wider text-foreground/25">
              Click pins to explore
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
