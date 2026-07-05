import { useState, useRef, useEffect } from 'react';
import { artworkGroups } from '../../data/artwork';
import { ArtworkItem } from '../ui/ArtworkItem';
import type { Artwork as ArtworkType, ArtworkEntry } from '../../types';

function ArtworkModal({ item, onClose }: { item: ArtworkType; onClose: () => void }) {
  const isVideo = !!item.thumbnail;
  const groupLabel = artworkGroups.find((g) => g.tipo === item.tipo)?.label ?? item.tipo;
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const syncWidth = () => {
    const media = isVideo ? videoRef.current : imgRef.current;
    if (media && infoRef.current) {
      infoRef.current.style.width = `${media.clientWidth}px`;
    }
  };

  useEffect(() => {
    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.titolo}
    >
      <div
        className="inline-flex flex-col items-center max-w-[calc(100vw-2rem)] md:max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chiudi */}
        <button
          onClick={onClose}
          className="self-end mb-2 cursor-pointer font-mono text-xs uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
          aria-label="Chiudi"
        >
          Chiudi ✕
        </button>

        {isVideo ? (
          <video
            ref={videoRef}
            src={item.src}
            autoPlay
            loop
            onLoadedMetadata={syncWidth}
            className="block max-h-[80vh] max-w-full border-2 border-background/20"
          >
            Il tuo browser non supporta i video HTML5.
          </video>
        ) : (
          <img
            ref={imgRef}
            src={item.src}
            alt={item.titolo}
            onLoad={syncWidth}
            className="block max-h-[80vh] max-w-full border-2 border-background/20"
          />
        )}

        {/* Info */}
        <div ref={infoRef} className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="shrink-0 font-display text-xl font-medium text-background">
            {item.titolo}
          </h3>
          <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-background/50">
            {groupLabel}{item.anno ? ` · ${item.anno}` : ''}
          </span>
          {item.descrizione && (
            <p className="w-full font-body text-sm italic text-background/60 mt-1">
              {item.descrizione}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const totalArtwork = artworkGroups.reduce((sum, g) => sum + g.items.length, 0);

function MasonryColumns({
  items, groupTipo, groupLabel, onSelect,
}: {
  items: ArtworkEntry[];
  groupTipo: string;
  groupLabel: string;
  onSelect: (item: ArtworkType) => void;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const getNumCols = (w: number) => (w >= 1280 ? 4 : w >= 768 ? 3 : 2);

  const buildCols = (heights: number[], numCols: number) => {
    const colHeights = new Array(numCols).fill(0);
    const cols: { item: ArtworkEntry; idx: number }[][] = Array.from({ length: numCols }, () => []);
    items.forEach((item, i) => {
      const shortest = colHeights.indexOf(Math.min(...colHeights));
      cols[shortest].push({ item, idx: i });
      colHeights[shortest] += heights[i] + 16;
    });
    return cols;
  };

  const [state, setState] = useState<{
    numCols: number;
    cols: { item: ArtworkEntry; idx: number }[][];
  }>(() => {
    const numCols = typeof window !== 'undefined' ? getNumCols(window.innerWidth) : 3;
    const cols = Array.from({ length: numCols }, (_, ci) =>
      items.map((item, idx) => ({ item, idx })).filter((_, i) => i % numCols === ci),
    );
    return { numCols, cols };
  });

  useEffect(() => {
    const outer = outerRef.current;
    const measure = measureRef.current;
    if (!outer || !measure) return;

    const recalc = () => {
      const numCols = getNumCols(outer.clientWidth);
      const children = Array.from(measure.children) as HTMLElement[];
      const heights = children.map(el => el.getBoundingClientRect().height);
      if (heights.every(h => h === 0)) return;
      setState({ numCols, cols: buildCols(heights, numCols) });
    };

    const ro = new ResizeObserver(recalc);
    ro.observe(outer);

    const imgs = measure.querySelectorAll('img');
    imgs.forEach(img => {
      (img as HTMLImageElement).loading = 'eager';
      if (!img.complete) img.addEventListener('load', recalc, { once: true });
    });

    recalc();
    return () => ro.disconnect();
  }, [items]);

  const colWidth = `calc(${100 / state.numCols}% - ${(state.numCols - 1) * 16 / state.numCols}px)`;

  return (
    <div ref={outerRef} className="relative">
      {/* Layer di misura — invisibile, fuori dal flusso */}
      <div
        ref={measureRef}
        aria-hidden
        style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', top: 0, left: 0, right: 0, zIndex: -1 }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ width: colWidth }}>
            <ArtworkItem item={{ ...item, tipo: groupTipo }} label={groupLabel} onClick={() => {}} displayNumber={i + 1} />
          </div>
        ))}
      </div>

      {/* Colonne visibili */}
      <div className="flex gap-4">
        {state.cols.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-4 flex-1">
            {col.map(({ item, idx }) => (
              <ArtworkItem
                key={idx}
                item={{ ...item, tipo: groupTipo }}
                label={groupLabel}
                onClick={onSelect}
                displayNumber={idx + 1}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Artwork() {
  const [selected, setSelected] = useState<ArtworkType | null>(null);
  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(
      artworkGroups
        .filter((g) => g.defaultOpen !== false)
        .map((g) => g.tipo),
    ),
  );

  const toggleGroup = (tipo: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(tipo)) next.delete(tipo);
      else next.add(tipo);
      return next;
    });
  };

  return (
    <>
      <section
        id="artwork"
        className="relative py-24 md:py-32 px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header sezione */}
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16 md:mb-24">
            <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tighter text-foreground">
              Artwork
            </h2>
            {totalArtwork > 0 && (
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {totalArtwork} {totalArtwork === 1 ? 'opera' : 'opere'}
              </p>
            )}
          </div>

          {artworkGroups.length > 0 ? (
            <div className="flex flex-col gap-6 md:gap-8">
              {artworkGroups.map((group) => {
                const isOpen = openGroups.has(group.tipo);
                return (
                  <div key={group.tipo}>
                    {/* Header sotto-sezione — cliccabile */}
                    <button
                      onClick={() => toggleGroup(group.tipo)}
                      className="group/hdr w-full flex items-center justify-between border-t border-foreground py-4 pl-3 pr-4 cursor-pointer hover:bg-foreground transition-colors duration-150 focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
                      aria-expanded={isOpen}
                    >
                      <h3 className="font-mono text-xs uppercase tracking-widest text-foreground group-hover/hdr:text-background transition-colors duration-150">
                        {group.label}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-muted-foreground group-hover/hdr:text-background/60 transition-colors duration-150">
                          {group.items.length} {group.items.length === 1 ? 'opera' : 'opere'}
                        </span>
                        <span
                          className="font-mono text-xs text-foreground group-hover/hdr:text-background transition-all duration-300"
                          style={{ display: 'inline-block', transform: isOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      </div>
                    </button>

                    {/* Contenuto collassabile */}
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                    >
                      <div className="overflow-hidden">
                        <div className="pt-8 md:pt-10 pb-16 md:pb-20">
                          {group.layout === 'masonry' ? (
                            <MasonryColumns
                              items={group.items}
                              groupTipo={group.tipo}
                              groupLabel={group.label}
                              onSelect={setSelected}
                            />
                          ) : (
                            <div className="flex flex-wrap gap-4">
                              {group.items.map((item, i) => (
                                <div key={i} className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]">
                                  <ArtworkItem item={{ ...item, tipo: group.tipo }} label={group.label} onClick={setSelected} displayNumber={i + 1} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-border-light py-20 flex flex-col items-center gap-4">
              <p className="font-display text-2xl text-muted-foreground italic">
                Nessun artwork ancora.
              </p>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Aggiungi le tue opere in src/data/artwork.ts
              </p>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <ArtworkModal item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
