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
  return (
    <span className="flex items-center gap-1">
      <span
        className="inline-block w-2 h-2 shrink-0"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      <span>{lang}</span>
    </span>
  );
}

interface PublicCardProps {
  project: MergedProject;
}

export function PublicProjectCard({ project }: PublicCardProps) {
  const preview = project.image ?? project.readmeImage ?? null;
  const target = project.siteUrl ?? project.html_url;
  const langs = project.languages.length > 0 ? project.languages : project.language ? [project.language] : [];

  return (
    <a
      href={target}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col border border-foreground bg-background transition-colors duration-100 hover:bg-foreground focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
      aria-label={`Apri ${project.name}`}
    >
      {/* Immagine preview */}
      <div className="aspect-video overflow-hidden border-b border-foreground bg-muted relative">
        {preview ? (
          <img
            src={preview}
            alt={`Preview di ${project.name}`}
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 group-hover:grayscale"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-background/50">
              {project.name}
            </span>
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
        <div className="flex items-start justify-between gap-2 mt-auto pt-3 border-t border-border-light group-hover:border-background/20">
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
    </a>
  );
}

interface PrivateCardProps {
  project: PrivateProject;
}

const TYPE_LABELS: Record<PrivateProject['type'], string> = {
  mobile: 'Mobile',
  web: 'Web',
  altro: 'Progetto',
};

export function PrivateProjectCard({ project }: PrivateCardProps) {
  const target = project.siteUrl ?? project.repoUrl;

  const card = (
    <div className="group flex flex-col border border-foreground bg-background transition-colors duration-100 hover:bg-foreground h-full">
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
        <div className="absolute top-3 right-3 font-mono text-[10px] uppercase tracking-widest bg-foreground text-background px-2 py-0.5 group-hover:bg-background group-hover:text-foreground">
          {TYPE_LABELS[project.type]} · Privato
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-display text-xl font-medium leading-tight text-foreground group-hover:text-background">
          {project.title}
        </h3>
        <p className="font-body text-sm leading-relaxed text-muted-foreground group-hover:text-background/70 flex-1">
          {project.description}
        </p>
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border-light group-hover:border-background/20">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-background/60"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (target) {
    return (
      <a
        href={target}
        target="_blank"
        rel="noopener noreferrer"
        className="focus-visible:outline-3 focus-visible:outline-foreground focus-visible:outline-offset-2"
        aria-label={`Apri ${project.title}`}
      >
        {card}
      </a>
    );
  }

  return <div>{card}</div>;
}
