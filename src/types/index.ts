export interface HeroData {
  nome: string;
  tagline: string;
  bio: string;
  foto?: string;
  social: {
    github?: string;
    linkedin?: string;
    instagram?: string;
    email?: string;
  };
}

export interface PublicRepoConfig {
  repoName: string;
  image?: string;
  siteUrl?: string;
  featured?: boolean;
  hidden?: boolean;
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
  hideGithubLink?: boolean;
  hideSiteLink?: boolean;
  tags?: string[];
  description?: string;
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
  languages: string[];
  stargazers_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  readmeImage: string | null;
  private: boolean;
  ownerLogin: string;
}

export interface MergedProject extends GitHubRepo {
  image?: string;
  featured?: boolean;
  siteUrl?: string;
  objectFit?: 'cover' | 'contain';
  bgColor?: string;
  hideGithubLink?: boolean;
  hideSiteLink?: boolean;
  tags?: string[];
}

export interface Esperienza {
  ruolo: string;
  organizzazione: string;
  luogo: string;
  periodo: string;
  descrizione: string;
  voto?: string;
  tags?: string[];
}

export interface ArtworkEntry {
  titolo: string;
  src: string;
  thumbnail?: string;
  anno?: number;
  numero?: number;
  descrizione?: string;
}

export interface ArtworkGroup {
  tipo: string;
  label: string;
  layout?: 'masonry' | 'grid';
  defaultOpen?: boolean;
  items: ArtworkEntry[];
}

export type Artwork = ArtworkEntry & { tipo: string };
