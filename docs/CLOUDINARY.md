# Cloudinary - Guida all'uso per il Portfolio

Cloud name: `fztk0qa2`

## Workflow per aggiungere assets

Non è necessario nessun SDK nel codice React. Il flusso è:

1. Vai su [cloudinary.com](https://cloudinary.com) → Media Library
2. Carica l'immagine o il video tramite il dashboard
3. Copia l'URL pubblico dell'asset
4. Incolla l'URL nel file appropriato in `src/data/`

## URL ottimizzati (da usare sempre)

### Immagini

```
https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto/[public_id]
```

Parametri utili:

- `w_800` - ridimensiona a 800px di larghezza
- `w_1200` - per immagini grandi (hero, full-width)
- `w_400` - per thumbnail piccoli
- `q_auto` - qualità ottimizzata automaticamente
- `f_auto` - formato ottimale (WebP su browser moderni)
- `ar_16:9,c_fill` - crop 16:9 centrato

Esempio completo:

```
https://res.cloudinary.com/fztk0qa2/image/upload/w_800,q_auto,f_auto,ar_16:9,c_fill/nome_file
```

### Video - thumbnail

```
https://res.cloudinary.com/fztk0qa2/video/upload/so_0,w_800,q_auto,f_auto/[public_id].jpg
```

- `so_0` - frame al secondo 0 del video

### Video - URL diretto

```
https://res.cloudinary.com/fztk0qa2/video/upload/q_auto/[public_id].mp4
```

## File da aggiornare

| Cosa                      | File                        |
|---------------------------|-----------------------------|
| Foto profilo              | `src/data/hero.ts`          |
| Immagini repo pubbliche   | `src/data/progetti.ts`      |
| App private (mobile ecc.) | `src/data/progetti.ts`      |
| brutalism / disegni / video  | `src/data/artwork.ts`       |
