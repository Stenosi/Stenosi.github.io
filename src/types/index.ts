export interface HeroData {
  nome: string;
  tagline: string;
  bio: string;
  foto?: string;
  social: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export interface PublicRepoConfig {
  repoName: string;
  image?: string;
  siteUrl?: string;
  featured?: boolean;
}

export interface PrivateProject {
  title: string;
  description: string;
  image: string;
  tags: string[];
  type: 'mobile' | 'web' | 'altro';
  siteUrl?: string;
  repoUrl?: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

export interface MergedProject extends GitHubRepo {
  image?: string;
  featured?: boolean;
  siteUrl?: string;
}

export interface Esperienza {
  ruolo: string;
  organizzazione: string;
  periodo: string;
  descrizione: string;
  tags?: string[];
}

export interface Artwork {
  titolo: string;
  tipo: 'poster' | 'disegno' | 'video';
  src: string;
  thumbnail?: string;
  anno?: number;
  descrizione?: string;
}
