import React from 'react';

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
];

export default function Footer() {
  return (
    <footer className="relative bg-void border-t border-foreground/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <span className="font-heading font-semibold text-sm tracking-widest uppercase text-pearl">
                The Black Pearl
              </span>
            </div>
            <p className="font-mono text-xs leading-relaxed text-mercury max-w-xs">
              Full-cycle digital agency crafting strategic products for businesses worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-mercury mb-4 block">
              Navigation
            </span>
            <nav className="flex flex-col gap-3">
              {footerLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-pearl/60 hover:text-pearl transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div>
            <span className="font-mono text-xs tracking-widest uppercase text-mercury mb-4 block">
              Legal
            </span>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-pearl/60 hover:text-pearl transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-mercury">
            © {new Date().getFullYear()} The Black Pearl. All rights reserved.
          </span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-mono text-xs text-mercury hover:text-pearl transition-colors duration-300 uppercase tracking-wider"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}