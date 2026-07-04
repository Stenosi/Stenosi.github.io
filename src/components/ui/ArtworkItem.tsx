import type { Artwork } from '../../types';

const TYPE_LABELS: Record<Artwork['tipo'], string> = {
  poster: 'Poster',
  disegno: 'Disegno',
  video: 'Video',
};

interface ArtworkItemProps {
  item: Artwork;
  onClick: (item: Artwork) => void;
}

export function ArtworkItem({ item, onClick }: ArtworkItemProps) {
  const isVideo = item.tipo === 'video';
  const imgSrc = isVideo ? item.thumbnail : item.src;

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative w-full text-left border border-foreground overflow-hidden bg-muted focus-visible:outline focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2 transition-all duration-100"
      aria-label={`Visualizza ${item.titolo}`}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={item.titolo}
          className="w-full h-full object-cover block transition-all duration-300 group-hover:scale-105 group-hover:border-4 group-hover:border-foreground"
          loading="lazy"
        />
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-muted">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            {item.titolo}
          </span>
        </div>
      )}

      {/* Overlay al hover */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/80 transition-colors duration-100 flex flex-col justify-end p-4">
        <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-100">
          <span className="font-mono text-[10px] uppercase tracking-widest text-background/60 block mb-1">
            {TYPE_LABELS[item.tipo]}{item.anno ? ` · ${item.anno}` : ''}
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
