import type { PublicRepoConfig, PrivateProject } from '../types';

// Configura le repo pubbliche di GitHub.
// repoName deve corrispondere esattamente al nome della repo su GitHub.
// Lascia image vuoto se vuoi solo i dati dell'API senza preview.
export const publicRepoConfigs: PublicRepoConfig[] = [
  // Esempio:
  // {
  //   repoName: 'Stenosi.github.io',
  //   image: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto,ar_16:9,c_fill/screenshot_portfolio',
  //   siteUrl: 'https://stenosi.github.io',
  //   featured: true,
  // },
];

// Progetti privati: inserisci manualmente tutti i dati.
// Per le immagini carica su Cloudinary e incolla l'URL.
export const privateProjects: PrivateProject[] = [
  {
    title: 'App Mobile — TODO: nome app',
    description: 'TODO: descrizione dell\'app. Cosa fa, tecnologie usate, stato del progetto.',
    // TODO: carica uno screenshot su Cloudinary e incolla l'URL
    image: '',
    tags: ['React Native', 'TypeScript', 'Mobile'],
    type: 'mobile',
    // siteUrl: 'https://...',  // se è deployata
  },
];
