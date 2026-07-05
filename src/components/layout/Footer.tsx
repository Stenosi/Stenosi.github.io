import { heroData } from '../../data/hero';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background relative overflow-hidden">
      {/* Texture verticale */}
      <div
        className="absolute inset-0 texture-vertical-white pointer-events-none"
        style={{ opacity: 0.03 }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          {/* Nome */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-background/50 mb-3">
              Portfolio
            </p>
            <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tighter text-background">
              {heroData.nome}
            </h2>
          </div>

          {/* Contatti e social */}
          <div className="flex flex-col gap-4">
            {heroData.social.email && (
              <a
                href={`mailto:${heroData.social.email}`}
                className="font-mono text-sm text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
              >
                {heroData.social.email}
              </a>
            )}
            <div className="flex gap-4">
              {heroData.social.github && (
                <a
                  href={heroData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
                >
                  GitHub →
                </a>
              )}
              {heroData.social.linkedin && (
                <a
                  href={heroData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
                >
                  LinkedIn →
                </a>
              )}
              {heroData.social.instagram && (
                <a
                  href={heroData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
                >
                  Instagram →
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-6 border-t border-background/20">
          <p className="font-mono text-xs text-background/30 uppercase tracking-widest">
            © {year} {heroData.nome}. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
}
