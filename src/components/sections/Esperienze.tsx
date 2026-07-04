import { esperienze } from '../../data/esperienze';

export function Esperienze() {
  return (
    <section
      id="esperienze"
      className="relative py-24 md:py-32 px-6 md:px-12"
    >
      {/* Texture diagonale */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(45deg, transparent, transparent 40px, #00000008 40px, #00000008 42px)',
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header sezione */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tighter text-foreground">
            Esperienze
          </h2>
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {esperienze.length} {esperienze.length === 1 ? 'voce' : 'voci'}
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {esperienze.map((exp, i) => (
            <div
              key={i}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-16 py-10 md:py-12 border-b border-border-light last:border-b-0"
            >
              {/* Dot + linea sinistra */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-2 h-2 bg-foreground mt-1.5 shrink-0" />
                {i < esperienze.length - 1 && (
                  <div className="w-px flex-1 bg-border-light mt-2" />
                )}
              </div>

              {/* Periodo */}
              <div className="md:w-48 shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {exp.periodo}
                </span>
              </div>

              {/* Contenuto */}
              <div className="flex-1">
                <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight text-foreground mb-1">
                  {exp.ruolo}
                </h3>
                <p className="font-body italic text-muted-foreground text-base mb-4">
                  {exp.organizzazione}
                </p>
                <p className="font-body text-base leading-relaxed text-muted-foreground max-w-xl">
                  {exp.descrizione}
                </p>
                {exp.tags && exp.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border-light px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {esperienze.length === 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground py-12">
              Aggiungi le tue esperienze in src/data/esperienze.ts
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
