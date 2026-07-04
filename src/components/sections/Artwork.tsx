import { useState } from 'react';
import { artwork } from '../../data/artwork';
import { ArtworkItem } from '../ui/ArtworkItem';
import type { Artwork as ArtworkType } from '../../types';

function ArtworkModal({ item, onClose }: { item: ArtworkType; onClose: () => void }) {
  const isVideo = item.tipo === 'video';

  return (
    <div
      className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.titolo}
    >
      <div
        className="relative max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Chiudi */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 font-mono text-xs uppercase tracking-widest text-background/70 hover:text-background transition-colors duration-100 focus-visible:outline focus-visible:outline-3 focus-visible:outline-background focus-visible:outline-offset-2"
          aria-label="Chiudi"
        >
          Chiudi ✕
        </button>

        {isVideo ? (
          <video
            src={item.src}
            controls
            autoPlay
            className="w-full max-h-[80vh] object-contain border-2 border-background/20"
          >
            Il tuo browser non supporta i video HTML5.
          </video>
        ) : (
          <img
            src={item.src}
            alt={item.titolo}
            className="w-full max-h-[80vh] object-contain border-2 border-background/20"
          />
        )}

        {/* Info */}
        <div className="mt-4 flex items-baseline justify-between">
          <h3 className="font-display text-xl font-medium text-background">
            {item.titolo}
          </h3>
          <span className="font-mono text-xs uppercase tracking-widest text-background/50">
            {item.tipo}{item.anno ? ` · ${item.anno}` : ''}
          </span>
        </div>
        {item.descrizione && (
          <p className="font-body text-sm italic text-background/60 mt-1">
            {item.descrizione}
          </p>
        )}
      </div>
    </div>
  );
}

export function Artwork() {
  const [selected, setSelected] = useState<ArtworkType | null>(null);

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
            {artwork.length > 0 && (
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {artwork.length} {artwork.length === 1 ? 'opera' : 'opere'}
              </p>
            )}
          </div>

          {artwork.length > 0 ? (
            /* Masonry layout via CSS columns */
            <div
              className="gap-4"
              style={{
                columns: 'var(--artwork-cols, 2)',
                columnGap: '1rem',
              }}
            >
              <style>{`
                @media (min-width: 768px) { :root { --artwork-cols: 3; } }
                @media (max-width: 767px) { :root { --artwork-cols: 2; } }
              `}</style>
              {artwork.map((item, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <ArtworkItem item={item} onClick={setSelected} />
                </div>
              ))}
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
