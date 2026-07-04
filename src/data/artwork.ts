import type { Artwork } from '../types';

// Aggiungi qui i tuoi poster, disegni e video.
// Per ogni asset: carica su Cloudinary, copia l'URL e incollalo nel campo src.
// Per i video, usa il campo thumbnail con l'URL della thumbnail Cloudinary.
export const artwork: Artwork[] = [
  // Esempio poster:
  // {
  //   titolo: 'Titolo del poster',
  //   tipo: 'poster',
  //   src: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto/nome_file',
  //   anno: 2024,
  //   descrizione: 'Breve descrizione opzionale.',
  // },
  // Esempio disegno:
  // {
  //   titolo: 'Titolo del disegno',
  //   tipo: 'disegno',
  //   src: 'https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto/nome_disegno',
  //   anno: 2023,
  // },
  // Esempio video:
  // {
  //   titolo: 'Titolo del video',
  //   tipo: 'video',
  //   src: 'https://res.cloudinary.com/fztk0qa2/video/upload/q_auto/nome_video.mp4',
  //   thumbnail: 'https://res.cloudinary.com/fztk0qa2/video/upload/so_0,w_800,q_auto,f_auto/nome_video.jpg',
  //   anno: 2024,
  // },
];
