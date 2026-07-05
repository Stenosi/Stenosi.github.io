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

      {/* Contenitore principale: su mobile in colonna, su desktop affiancati e centrati verticalmente */}
      <div className="relative flex flex-col md:flex-row gap-10 md:gap-20 items-stretch md:items-center pb-16">

        {/* BLOCCO SINISTRO: Contiene Nome, Tagline, Bio e Social */}
        <div className="md:w-1/2 flex flex-col">
          {/* Nome oversized */}
          <div className="relative">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
              Portfolio - {new Date().getFullYear()}
            </p>
            <h1 className="font-display font-bold leading-none tracking-tighter text-foreground text-[clamp(3.5rem,12vw,9rem)]">
              {heroData.nome}
            </h1>
            <div className="flex items-baseline gap-4 mt-3">
            </div>
            <p className="font-body text-xl md:text-2xl italic text-muted-foreground mt-6 max-w-lg">
              {heroData.tagline}
            </p>
          </div>

          {/* Bio e social */}
          <div className="flex flex-col gap-8 mt-16">
            <p className="font-body text-base md:text-lg leading-relaxed text-muted-foreground max-w-md">
              {heroData.bio}
            </p>

            <div className="flex flex-wrap gap-3">
              {heroData.social.github && (
                <a
                  href={heroData.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest border-2 border-foreground px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
                >
                  GitHub →
                </a>
              )}
              {heroData.social.linkedin && (
                <a
                  href={heroData.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest border-2 border-foreground px-5 py-3 text-foreground hover:bg-foreground hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
                >
                  LinkedIn →
                </a>
              )}
              {heroData.social.instagram && (
                <a
                  href={heroData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest border border-border-light px-5 py-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
                >
                  Instagram
                </a>
              )}
              {heroData.social.email && (
                <a
                  href={`mailto:${heroData.social.email}`}
                  className="font-mono text-xs tracking-widest border border-border-light px-5 py-3 text-muted-foreground hover:border-foreground hover:text-foreground transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
                >
                  davidemarsili4@gmail.com
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BLOCCO DESTRO: Foto profilo */}
        <div className="md:w-1/2 flex justify-center xl:justify-end">
            <div className="relative w-56 md:w-72 group">
              <div
                className="absolute -bottom-2 -right-2 w-full h-full border-2 border-foreground
                group-hover:translate-x-1.5 group-hover:translate-y-1.5 transition-transform duration-100"
                aria-hidden="true"
              />
              <img
                src={heroData.foto}
                alt={`Foto di ${heroData.nome}`}
                className="relative w-full border-2 border-foreground object-cover aspect-3/4
          group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 transition-transform duration-100"
              />
            </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative w-full">
        <div className="h-px bg-border-light w-full" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-background px-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Scorri
          </span>
          <span className="font-mono text-muted-foreground">↓</span>
        </div>
      </div>
    </section>
  );
}
