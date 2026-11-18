import type { Esperienza } from '../../types';
import { esperienze } from '../../data/esperienze';

type GruppoEsp = {
  organizzazione: string;
  luogo: string;
  periodoTotale: string;
  items: Esperienza[];
};

function raggruppaEsperienze(list: Esperienza[]): GruppoEsp[] {
  const result: GruppoEsp[] = [];
  let i = 0;
  while (i < list.length) {
    const org = list[i].organizzazione;
    const group: Esperienza[] = [];
    while (i < list.length && list[i].organizzazione === org) {
      group.push(list[i]);
      i++;
    }
    const oldest = group[group.length - 1];
    const newest = group[0];
    const start = oldest.periodo.split(' - ')[0];
    const end = newest.periodo.includes(' - ')
      ? newest.periodo.split(' - ')[1]
      : newest.periodo;
    result.push({
      organizzazione: org,
      luogo: group[0].luogo,
      periodoTotale: `${start} - ${end}`,
      items: group,
    });
  }
  return result;
}

export function Esperienze() {
  const gruppi = raggruppaEsperienze(esperienze);

  const renderRuolo = (testo: string) => {
    const regex = /(\([^)]+\d+[^)]*\))/g;
    const parti = testo.split(regex);

    return parti.map((parte, index) => {
      if (regex.test(parte)) {
        return (
          <span key={index} className="whitespace-nowrap">
            {parte}
          </span>
        );
      }
      return parte;
    });
  };

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
            {gruppi.length} {gruppi.length === 1 ? 'voce' : 'voci'}
          </p>
        </div>

        {/* Timeline */}
        <div className="flex flex-col">
          {gruppi.map((gruppo, i) => (
            <div
              key={i}
              className="group relative flex flex-col md:flex-row gap-6 md:gap-16 py-10 md:py-12 border-b border-border-light last:border-b-0"
            >
              {/* Dot + linea sinistra */}
              <div className="hidden md:flex flex-col items-center">
                <div className="w-2 h-2 bg-foreground mt-1.5 shrink-0" />
                {i < gruppi.length - 1 && (
                  <div className="w-px flex-1 bg-border-light mt-2" />
                )}
              </div>

              {/* Periodo */}
              <div className="md:w-48 shrink-0">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {gruppo.periodoTotale}
                </span>
              </div>

              {/* Contenuto */}
              <div className="flex-1">
                {gruppo.items.length === 1 ? (
                  <>
                    <div className="flex items-baseline gap-4 mb-1">
                      <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight text-foreground">
                        {renderRuolo(gruppo.items[0].ruolo)}
                      </h3>
                      {gruppo.items[0].voto && (
                        <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground border border-border-light px-2 py-0.5 shrink-0">
                          {gruppo.items[0].voto}
                        </span>
                      )}
                    </div>
                    <p className="font-body italic text-muted-foreground text-base mb-4">
                      {gruppo.organizzazione}
                      {gruppo.luogo && (
                        <span className="font-mono not-italic text-xs uppercase tracking-widest ml-3">
                          · {gruppo.luogo}
                        </span>
                      )}
                    </p>
                    <p className="font-body text-base leading-relaxed text-muted-foreground max-w-xl">
                      {gruppo.items[0].descrizione}
                    </p>
                    {gruppo.items[0].tags && gruppo.items[0].tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {gruppo.items[0].tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border-light px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="font-body italic text-foreground text-base mb-6">
                      {gruppo.organizzazione}
                      {gruppo.luogo && (
                        <span className="font-mono not-italic text-xs uppercase tracking-widest ml-3 text-muted-foreground">
                          · {gruppo.luogo}
                        </span>
                      )}
                    </p>
                    <div className="flex flex-col mb-6">
                      {gruppo.items.map((item, j) => (
                        <div key={j} className="flex gap-5">
                          {/* Sub-dot + linea verticale */}
                          <div className="flex flex-col items-center pt-1.5">
                            <div className="w-1.5 h-1.5 border border-foreground shrink-0" />
                            {j < gruppo.items.length - 1 && (
                              <div className="w-px flex-1 bg-border-light mt-1.5" />
                            )}
                          </div>
                          {/* Ruolo + periodo */}
                          <div className="pb-5">
                            <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight tracking-tight text-foreground mb-1">
                              {renderRuolo(item.ruolo)}
                            </h3>
                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                              {item.periodo}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="font-body text-base leading-relaxed text-muted-foreground max-w-xl">
                      {gruppo.items[0].descrizione}
                    </p>
                    {gruppo.items[0].tags && gruppo.items[0].tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">
                        {gruppo.items[0].tags.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border-light px-2 py-0.5"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}

          {gruppi.length === 0 && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground py-12">
              Aggiungi le tue esperienze in src/data/esperienze.ts
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
