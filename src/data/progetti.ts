import type { PublicRepoConfig, PrivateProject } from '../types';

// Configurazione manuale per repo che compaiono già dalla GitHub API.
// repoName deve corrispondere esattamente al nome della repo su GitHub.
// image: opzionale, sovrascrive la prima immagine del README auto-estratta.
// siteUrl: sovrascrive l'homepage della repo.
export const publicRepoConfigs: PublicRepoConfig[] = [
  {
    repoName: 'catsee',
    featured: true,
    hideGithubLink: true,
  },
  {
    repoName: 'Bones-Do-Rest-Beneath',
    featured: true,
    objectFit: 'contain',
    bgColor: '#226594',
  },
  {
    repoName: 'flow-nvidia-control',
    featured: true,
  },
  {
    repoName: 'Edge-Rewards-Test',
    hidden: true,
  },
  {
    repoName: 'edge-rewards',
    hidden: true,
  },
  {
    repoName: 'Stenosi.github.io',
    hideSiteLink: true,
  },
  {
    repoName: 'flow-nvidia-control',
    hideSiteLink: true,
  },
  {
    repoName: 'aziende-marchigiane',
    hideSiteLink: true,
  },
  {
    repoName: 'StrangePlacesJam',
    objectFit: 'contain',
    bgColor: '#373737',
    description: 'System Error: Gravity Not Found \n Made for Brackeys Game Jam 2026.1',
    image: 'https://img.itch.zone/aW1nLzI1NzM0MTkzLnBuZw==/315x250%23c/7u5Pd9.png',
    siteUrl: 'https://ctrl-elle.itch.io/system-error-gravity-not-found',
    tags: ['Itch.io', 'Godot'],
  },
  {
    repoName: 'Utilities',
    siteUrl: 'https://stenosi-org.github.io/Utilities/dist/index.html'
  }
];

// Progetti completamente privati senza repo GitHub visibile dal token.
// CatSee è già gestita sopra tramite API (la repo è privata ma il token la trova).
export const privateProjects: PrivateProject[] = [
  // Esempio se avessi un progetto fuori da GitHub:
  {
    title: 'No Syntax Required',
    description: 'Progettazione e sviluppo di un videogioco educativo per l\'apprendimento dei concetti base di programmazione realizzato in Godot.',
    image: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto,ar_16:9,c_fill/NoSyntaxRequired_knsezw.png',
    tags: ['Godot', 'GDScript'],
    type: 'altro',
  },
];
