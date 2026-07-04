import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Chi sono', href: '#hero' },
  { label: 'Esperienze', href: '#esperienze' },
  { label: 'Progetti', href: '#progetti' },
  { label: 'Artwork', href: '#artwork' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-foreground">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14">
        {/* Logo / nome */}
        <a
          href="#hero"
          className="font-display text-lg font-medium tracking-tight text-foreground hover:opacity-70 transition-opacity duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
        >
          Stenosi
        </a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Navigazione principale">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Hamburger mobile */}
        <button
          className="md:hidden flex flex-col justify-center gap-1.5 w-10 h-10 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-100 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-opacity duration-100 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-transform duration-100 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
          />
        </button>
      </div>

      {/* Drawer mobile */}
      {menuOpen && (
        <nav
          className="md:hidden border-t border-foreground bg-foreground"
          aria-label="Navigazione mobile"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block font-mono text-xs uppercase tracking-widest text-background px-6 py-4 border-b border-background/20 hover:bg-background hover:text-foreground transition-colors duration-100"
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
