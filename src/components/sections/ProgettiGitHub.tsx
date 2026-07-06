import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { privateProjects } from '../../data/progetti';
import { PublicProjectCard, PrivateProjectCard } from '../ui/ProjectCard';

function gridCols(count: number): string {
  const base = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';
  return count >= 4 ? base + ' xl:grid-cols-4' : base;
}

export function ProgettiGitHub() {
  const { repos, loading, error } = useGitHubRepos();

  return (
    <section
      id="progetti"
      className="relative py-24 md:py-32 px-6 md:px-12 bg-muted"
    >
      {/* Texture grid */}
      <div
        className="absolute inset-0 texture-grid pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header sezione */}
        <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4 mb-16 md:mb-24">
          <h2 className="font-display text-5xl md:text-7xl font-medium leading-none tracking-tighter text-foreground">
            Progetti
          </h2>
          {!loading && !error && (
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {repos.length + privateProjects.length} progetti totali
            </p>
          )}
        </div>

        {/* Repo pubbliche */}
        {loading && (
          <div className="py-12">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground animate-pulse">
              Caricamento repo GitHub...
            </p>
          </div>
        )}

        {error && (
          <div className="py-6 border border-foreground px-6">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Impossibile caricare le repo: {error}
            </p>
          </div>
        )}

        {!loading && !error && repos.length > 0 && (
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Repository GitHub
            </p>
            <div className={gridCols(repos.length)}>
              {repos.map((repo) => (
                <PublicProjectCard key={repo.id} project={repo} />
              ))}
            </div>
          </div>
        )}

        {/* Progetti non su GitHub */}
        {privateProjects.length > 0 && (
          <div className={repos.length > 0 && !loading ? 'mt-16' : ''}>
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-8">
              Progetti esterni
            </p>
            <div className={gridCols(privateProjects.length)}>
              {privateProjects.map((proj, i) => (
                <PrivateProjectCard key={i} project={proj} />
              ))}
            </div>
          </div>
        )}

        {!loading && repos.length === 0 && privateProjects.length === 0 && (
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground py-12">
            Nessun progetto disponibile. Configura src/data/progetti.ts.
          </p>
        )}
      </div>
    </section>
  );
}
