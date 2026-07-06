import type { PublicRepoConfig, PrivateProject } from '../types';

// Configurazione manuale per repo che compaiono già dalla GitHub API.
// repoName deve corrispondere esattamente al nome della repo su GitHub.
// image: opzionale, sovrascrive la prima immagine del README auto-estratta.
// siteUrl: sovrascrive l'homepage della repo.
export const publicRepoConfigs: PublicRepoConfig[] = [
  {
    repoName: 'Stenosi.github.io',
    featured: true,
    hideSiteLink: true,
  },
  {
    repoName: 'flow-nvidia-control',
    featured: true,
    hideSiteLink: true,
  },
  {
    repoName: 'aziende-marchigiane',
    featured: true,
    hideSiteLink: true,
  },
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
