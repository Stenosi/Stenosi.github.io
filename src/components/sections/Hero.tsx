import { heroData } from '../../data/hero';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[calc(100svh-3.5rem)] flex flex-col justify-between px-6 md:px-12 pt-20 md:pt-28 pb-0 max-w-7xl mx-auto w-full"
    >
      {/* Texture orizzontale */}
      <div
        className="absolute inset-0 texture-lines pointer-events-none"
        style={{ opacity: 0.015 }}
        aria-hidden="true"
      />

      {/* Nome oversized */}
      <div className="relative">
        <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
          Portfolio — {new Date().getFullYear()}
        </p>
        <h1 className="font-display font-bold leading-none tracking-tighter text-foreground text-[clamp(3.5rem,12vw,9rem)]">
          {heroData.nome}
        </h1>
        <p className="font-body text-xl md:text-2xl italic text-muted-foreground mt-6 max-w-lg">
          {heroData.tagline}
        </p>
      </div>

      {/* Bio + foto + social */}
      <div className="relative flex flex-col md:flex-row gap-10 md:gap-20 items-start md:items-end pb-16 mt-16 md:mt-0">
        {/* Bio e social */}
        <div className="md:w-1/2 flex flex-col gap-8">
          <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
            {heroData.bio}
          </p>

          <div className="flex flex-wrap gap-3">
            {heroData.social.github && (
              <a
                href={heroData.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest border-2 border-foreground px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
              >
                GitHub →
              </a>
            )}
            {heroData.social.linkedin && (
              <a
                href={heroData.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest border-2 border-foreground px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
              >
                LinkedIn →
              </a>
            )}
            {heroData.social.email && (
              <a
                href={`mailto:${heroData.social.email}`}
                className="font-mono text-xs uppercase tracking-widest border border-border-light px-5 py-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
              >
                Email
              </a>
            )}
          </div>
        </div>

        {/* Foto profilo */}
        <div className="md:w-1/2 flex md:justify-end">
          {heroData.foto ? (
            <div className="relative w-56 md:w-72">
              {/* Elemento decorativo sfasato */}
              <div
                className="absolute -bottom-2 -right-2 w-full h-full border-2 border-foreground"
                aria-hidden="true"
              />
              <img
                src={heroData.foto}
                alt={`Foto di ${heroData.nome}`}
                className="relative w-full border-2 border-foreground object-cover aspect-[3/4]"
              />
            </div>
          ) : (
            /* Placeholder quando non c'è la foto */
            <div className="w-56 md:w-72 aspect-[3/4] border-2 border-border-light flex items-center justify-center bg-muted">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground text-center px-4">
                Aggiungi la tua foto in<br />src/data/hero.ts
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Riga decorativa + scroll indicator */}
      <div className="relative w-full">
        <div className="h-px bg-border-light w-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-background pl-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Scorri
          </span>
          <span className="font-mono text-muted-foreground">↓</span>
        </div>
      </div>
    </section>
  );
}
