import { useState, useEffect } from 'react';
import type { MergedProject, PrivateProject } from '../../types';

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  Rust: '#dea584',
  Go: '#00ADD8',
  HTML: '#e34c26',
  CSS: '#563d7c',
  SCSS: '#c6538c',
  Dart: '#00B4AB',
  GDScript: '#355570',
  'C#': '#178600',
  PHP: '#4F5D95',
};

function LanguageDot({ lang }: { lang: string }) {
  const color = LANG_COLORS[lang] ?? '#888';
  const isGodot = lang.toLowerCase() === 'godot';
  return (
    <span className="flex items-center gap-1">
      {isGodot ? (
        <img src="/godot-logo.svg" alt="" className="w-3 h-3 shrink-0" aria-hidden="true" />
      ) : (
        <span
          className="inline-block w-2 h-2 shrink-0"
          style={{ backgroundColor: color }}
          aria-hidden="true"
        />
      )}
      <span>{lang}</span>
    </span>
  );
}

function useDominantColor(imageUrl: string | null): string {
  const [color, setColor] = useState('#f5f5f5');
  useEffect(() => {
    if (!imageUrl) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 1, 1);
        const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
        setColor(`rgb(${r},${g},${b})`);
      } catch {
        // CORS restriction — keep default color
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);
  return color;
}

interface PublicCardProps {
  project: MergedProject;
}

export function PublicProjectCard({ project }: PublicCardProps) {
  const preview = project.image ?? project.readmeImage ?? null;
  const objectFit = project.objectFit ?? 'cover';
  const dominantColor = useDominantColor(objectFit === 'contain' ? preview : null);
  const langs = project.languages.length > 0 ? project.languages : project.language ? [project.language] : [];

  const badge = project.private ? 'Privata' : null;

  const siteUrl = project.siteUrl;
  const showGithub = !project.hideGithubLink;
  const showSite = !project.hideSiteLink && !!siteUrl;

  return (
    <div className="flex flex-col border border-foreground">
      {/* Body — group isolato: l'hover non si propaga ai bottoni */}
      <div className="group flex flex-col flex-1 bg-background transition-colors duration-100 hover:bg-foreground">
        {/* Immagine preview */}
        <div
          className="aspect-video overflow-hidden border-b border-foreground relative"
          style={objectFit === 'contain' ? { backgroundColor: dominantColor } : undefined}
        >
          {preview ? (
            <img
              src={preview}
              alt={`Preview di ${project.name}`}
              className={`w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:grayscale ${objectFit === 'contain' ? 'object-contain' : 'object-cover'}`}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/50">
                {project.name}
              </span>
            </div>
          )}
          {badge && (
            <div className="absolute top-0 right-0 font-mono text-[10px] uppercase tracking-widest bg-background text-foreground px-2 py-1 border-l border-b border-foreground transition-colors duration-100 group-hover:bg-foreground group-hover:text-background">
              {badge}
            </div>
          )}
        </div>

        {/* Contenuto */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-display text-xl font-medium leading-tight text-foreground group-hover:text-background">
            {project.name}
          </h3>
          {project.description && (
            <p className="font-body text-sm leading-relaxed text-muted-foreground group-hover:text-background/70 flex-1">
              {project.description}
            </p>
          )}

          {/* Topics */}
          {project.topics.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/50 border border-current px-1.5 py-0.5"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}

          {/* Linguaggi + stelle */}
          <div className="flex items-start justify-between gap-2 mt-auto pt-3 border-t border-border-light transition-colors duration-100 group-hover:border-background/20">
            <div className="font-mono text-[11px] text-muted-foreground group-hover:text-background/60 flex flex-wrap gap-x-3 gap-y-1">
              {langs.map((lang) => (
                <LanguageDot key={lang} lang={lang} />
              ))}
            </div>
            {project.stargazers_count > 0 && (
              <span className="font-mono text-xs text-muted-foreground group-hover:text-background/60 shrink-0">
                ★ {project.stargazers_count}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Barra azioni — fuori dal group, hover indipendente */}
      {(showGithub || showSite) && (
        <div className="flex border-t border-foreground bg-background">
          {showGithub && (
            <a
              href={project.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri repository GitHub di ${project.name}`}
              className={`flex-1 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors duration-100 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-2${showSite ? ' border-r border-foreground' : ''}`}
            >
              ↗ GitHub
            </a>
          )}
          {showSite && (
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri sito di ${project.name}`}
              className="flex-1 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors duration-100 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-2"
            >
              ↗ Sito
            </a>
          )}
        </div>
      )}
    </div>
  );
}

interface PrivateCardProps {
  project: PrivateProject;
}


export function PrivateProjectCard({ project }: PrivateCardProps) {
  const hasRepo = !!project.repoUrl;
  const hasSite = !!project.siteUrl;

  return (
    <div className="flex flex-col border border-foreground h-full">
      {/* Body — group isolato: l'hover non si propaga ai bottoni */}
      <div className="group flex flex-col flex-1 bg-background transition-colors duration-100 hover:bg-foreground">
        <div className="aspect-video overflow-hidden border-b border-foreground bg-muted relative">
          {project.image ? (
            <img
              src={project.image}
              alt={`Preview di ${project.title}`}
              className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:grayscale"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/50">
                {project.title}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-display text-xl font-medium leading-tight text-foreground group-hover:text-background">
            {project.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-muted-foreground group-hover:text-background/70 flex-1">
            {project.description}
          </p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-auto pt-3 border-t border-border-light transition-colors duration-100 group-hover:border-background/20 font-mono text-[11px] text-muted-foreground group-hover:text-background/60">
              {project.tags.map((tag) =>
                LANG_COLORS[tag] || tag.toLowerCase() === 'godot' ? (
                  <LanguageDot key={tag} lang={tag} />
                ) : (
                  <span key={tag} className="uppercase tracking-widest">
                    {tag}
                  </span>
                )
              )}
            </div>
          )}
        </div>
      </div>

      {(hasRepo || hasSite) && (
        <div className="flex border-t border-foreground bg-background">
          {hasRepo && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri repository di ${project.title}`}
              className={`flex-1 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors duration-100 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-2${hasSite ? ' border-r border-foreground' : ''}`}
            >
              ↗ Repo
            </a>
          )}
          {hasSite && (
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Apri sito di ${project.title}`}
              className="flex-1 py-3 text-center font-mono text-[10px] uppercase tracking-widest text-foreground transition-colors duration-100 hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-foreground focus-visible:-outline-offset-2"
            >
              ↗ Sito
            </a>
          )}
        </div>
      )}
    </div>
  );
}
