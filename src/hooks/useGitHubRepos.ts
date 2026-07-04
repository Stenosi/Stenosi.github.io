import { useState, useEffect } from 'react';
import type { GitHubRepo, MergedProject } from '../types';
import { publicRepoConfigs } from '../data/progetti';

const GITHUB_USERNAME = 'Stenosi';

function mergeWithConfigs(repos: GitHubRepo[]): MergedProject[] {
  const merged: MergedProject[] = repos.map((repo) => {
    const config = publicRepoConfigs.find((c) => c.repoName === repo.name);
    return {
      ...repo,
      image: config?.image,
      featured: config?.featured ?? false,
      siteUrl: config?.siteUrl ?? repo.homepage ?? undefined,
    };
  });

  merged.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return merged;
}

export function useGitHubRepos() {
  const [repos, setRepos] = useState<MergedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      // 1. Prova il file statico generato a build-time con il token CI
      try {
        const res = await fetch('/repos.json');
        if (res.ok) {
          const data: GitHubRepo[] = await res.json();
          if (data.length > 0) {
            setRepos(mergeWithConfigs(data));
            setLoading(false);
            return;
          }
        }
      } catch {
        // File non presente (dev locale senza build) — si cade nel fallback
      }

      // 2. Fallback: API pubblica per sviluppo locale (solo repo proprie, nessun token)
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
        );
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        const data: GitHubRepo[] = await res.json();
        const filtered = data.filter((r) => !r.fork && !r.archived);
        setRepos(mergeWithConfigs(filtered));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Errore sconosciuto');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return { repos, loading, error };
}
