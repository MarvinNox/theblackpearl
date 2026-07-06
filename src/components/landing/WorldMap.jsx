import { useEffect, useRef, useState } from "react";

export default function WorldMap({
  hoveredCountries = ["ua", "pl", "de", "us"],
  disabledCountries = ["ru"],
  activeCountry = null,
  onCountryClick = () => {},
  className = "",
}) {
  const mapRef = useRef(null);
  const [svgLoaded, setSvgLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      try {
        const res = await fetch("/world-map.svg");
        const svgText = await res.text();

        if (!isMounted || !mapRef.current) return;

        mapRef.current.innerHTML = svgText;
        setSvgLoaded(true);
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
    if (!svgLoaded || !mapRef.current) return;

    const mapRoot = mapRef.current;

    const countries = mapRoot.querySelectorAll(
      "#world-map > g > path[id], #world-map > g > g[id]",
    );

    const hoveredSet = new Set(hoveredCountries.map((id) => id.toLowerCase()));
    const disabledSet = new Set(
      disabledCountries.map((id) => id.toLowerCase()),
    );
    const activeId = activeCountry ? activeCountry.toLowerCase() : null;

    const cleanupFns = [];

    countries.forEach((el) => {
      const id = el.id.toLowerCase();

      el.classList.remove("is-hovered", "is-active", "is-disabled");

      if (disabledSet.includes(id)) {
        el.classList.add("is-disabled");
        return;
      }

      if (hoveredSet.includes(id)) {
        el.classList.add("is-hovered");
      }

      if (activeId && id === activeId) {
        el.classList.add("is-active");
      }

      const handleClick = () => {
        if (disabledSet.includes(id)) return;

        countries.forEach((node) => node.classList.remove("is-active"));
        el.classList.add("is-active");
        onCountryClick(id);
      };

      el.addEventListener("click", handleClick);
      cleanupFns.push(() => el.removeEventListener("click", handleClick));
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [
    svgLoaded,
    hoveredCountries,
    disabledCountries,
    activeCountry,
    onCountryClick,
  ]);

  return (
    <div className={`w-full ${className}`}>
      <style>{`
        #world-map {
          width: 100%;
          height: auto;
          display: block;
        }

        #world-map > g > path[id],
        #world-map > g > g[id] path {
          fill: #d8e6f3;
          stroke: #ffffff;
          stroke-width: 1;
          transition: fill 0.2s ease;
        }

        #world-map > g > path[id],
        #world-map > g > g[id] {
          cursor: pointer;
        }

        #world-map > g > path[id]:hover,
        #world-map > g > g[id]:hover path,
        #world-map > g > path[id].is-hovered,
        #world-map > g > g[id].is-hovered path {
          fill: #3b82f6;
        }

        #world-map .is-active,
        #world-map .is-active path {
          fill: #1d4ed8;
        }

        #world-map > g > path[id].is-disabled,
        #world-map > g > g[id].is-disabled path {
          fill: #d8e6f3;
          pointer-events: none;
          cursor: default;
        }
      `}</style>

      <div
        ref={mapRef}
        className="w-full max-w-[1000px] [&_svg]:h-auto [&_svg]:w-full"
      />
    </div>
  );
}
