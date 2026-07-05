import type { PublicRepoConfig, PrivateProject } from '../types';

// Configurazione manuale per repo che compaiono già dalla GitHub API.
// repoName deve corrispondere esattamente al nome della repo su GitHub.
// image: opzionale, sovrascrive la prima immagine del README auto-estratta.
// siteUrl: sovrascrive l'homepage della repo.
export const publicRepoConfigs: PublicRepoConfig[] = [
  {
    repoName: 'CatSee',
    // image: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto,ar_16:9,c_fill/catsee_screenshot',
    // siteUrl: 'https://...',
    featured: true,
  },
  // Aggiungi qui le repo delle battaglie navale / videogiochi se vuoi metterle in evidenza:
  // {
  //   repoName: 'nome-repo-phaser',
  //   featured: true,
  //   siteUrl: 'https://stenosi.github.io/nome-repo',
  // },
];

// Progetti completamente privati senza repo GitHub visibile dal token.
// CatSee è già gestita sopra tramite API (la repo è privata ma il token la trova).
export const privateProjects: PrivateProject[] = [
  // Esempio se avessi un progetto fuori da GitHub:
  // {
  //   title: 'Videogioco non ancora in repo',
  //   description: 'Descrizione del progetto.',
  //   image: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto,ar_16:9,c_fill/nome_file',
  //   tags: ['Godot', 'GDScript'],
  //   type: 'altro',
  // },
];
