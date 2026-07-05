import type { Artwork } from '../../types';

interface ArtworkItemProps {
  item: Artwork;
  label: string;
  onClick: (item: Artwork) => void;
  displayNumber?: number;
}

export function ArtworkItem({ item, label, onClick, displayNumber }: ArtworkItemProps) {
  const isVideo = !!item.thumbnail;
  const imgSrc = isVideo ? item.thumbnail : item.src;
  const numStr = displayNumber !== undefined ? String(displayNumber).padStart(2, '0') : null;

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative cursor-pointer w-full text-left border border-foreground overflow-hidden bg-muted focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2 transition-all duration-100"
      aria-label={`Visualizza ${item.titolo}`}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={item.titolo}
          className="w-full h-full object-cover block transition-all duration-300 group-hover:scale-105"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-muted">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {item.titolo}
          </span>
        </div>
      )}

      {/* Numero — sempre visibile in alto a sinistra */}
      {numStr && (
        <div className="absolute top-0 left-0 font-mono text-[10px] uppercase tracking-widest bg-background text-foreground px-2 py-1 border-r border-b border-foreground group-hover:bg-foreground group-hover:text-background transition-colors duration-100">
          {numStr}
        </div>
      )}

      {/* Overlay al hover */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/70 transition-colors duration-100 flex flex-col justify-end p-4">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-background/60 block mb-1">
            {label}{item.anno ? ` · ${item.anno}` : ''}
          </span>
          <p className="font-display text-base font-medium text-background leading-tight">
            {item.titolo}
          </p>
        </div>
      </div>

      {/* Icona play per video */}
      {isVideo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border-2 border-foreground bg-background flex items-center justify-center group-hover:bg-foreground transition-colors duration-100">
          <svg
            className="w-5 h-5 text-foreground group-hover:text-background transition-colors duration-100 ml-0.5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </button>
  );
}
