# Stenosi.github.io

Portfolio personale di Davide Marsili — sviluppatore web, game dev e creativo.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · GitHub Pages

---

## Struttura del progetto

```text
Stenosi.github.io/
├── .github/workflows/deploy.yml   # CI/CD GitHub Pages
├── scripts/
│   └── fetch-repos.mjs            # Fetch dati da GitHub API
├── public/
│   └── repos.json                 # Generato a build-time
├── src/
│   ├── components/
│   │   ├── layout/                # Header, Footer
│   │   ├── sections/              # Hero, Esperienze, ProgettiGitHub, Artwork
│   │   └── ui/                    # ProjectCard, ArtworkItem, SectionRule
│   ├── data/
│   │   ├── hero.ts                # Nome, bio, foto, social
│   │   ├── esperienze.ts          # Timeline esperienze
│   │   ├── progetti.ts            # Config repo GitHub + progetti privati
│   │   └── artwork.ts             # Gruppi artwork
│   ├── hooks/
│   │   └── useGitHubRepos.ts      # Fetch e merge repo con config custom
│   └── types/index.ts             # Interfacce TypeScript
├── index.html
└── vite.config.ts
```

---

## Setup locale

```bash
git clone https://github.com/Stenosi/Stenosi.github.io.git
cd Stenosi.github.io
npm install
npm run dev          # http://localhost:5173
```

### Script disponibili

| Comando              | Descrizione                                          |
| -------------------- | ---------------------------------------------------- |
| `npm run dev`        | Dev server con hot-reload                            |
| `npm run build`      | Build di produzione (fetch repos → tsc → vite build) |
| `npm run fetch-repos`| Solo fetch repos GitHub → `public/repos.json`        |
| `npm run lint`       | ESLint check                                         |
| `npm run preview`    | Anteprima build locale                               |

---

## Variabili d'ambiente

| Variabile      | Richiesta  | Descrizione                                                                                                         |
| -------------- | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| `REPOS_TOKEN`  | Facoltativa| Token GitHub personale. Se presente, include repo private e collaborazioni. Senza token usa l'API pubblica (solo repo proprie). |

**Localmente:**

```bash
$env:REPOS_TOKEN = "ghp_xxxxx"   # PowerShell
npm run build
```

**In CI:**

1. Vai su [github.com/settings/tokens](https://github.com/settings/tokens) → *Generate new token (classic)*
2. Seleziona lo scope **`repo`** (necessario per repo private e collaborazioni)
3. Copia il token generato (`ghp_xxxxx`)
4. Nella repo del sito: *Settings → Secrets and variables → Actions → New repository secret*
5. Nome: `REPOS_TOKEN`, valore: il token copiato

Il workflow lo usa automaticamente:

```yaml
env:
  REPOS_TOKEN: ${{ secrets.REPOS_TOKEN }}
```

---

## Come funziona il fetch delle repo

Lo script `scripts/fetch-repos.mjs` viene eseguito a ogni build:

1. Fetcha tutte le repo (con token: `affiliation=owner,collaborator,organization_member`; senza: solo repo pubbliche)
2. Filtra repo archiviate
3. Per ogni repo estrae la prima immagine dal README (markdown e HTML `<img>`)
4. Recupera i linguaggi usati (ordinati per byte)
5. Scrive il risultato in `public/repos.json`

Il file `repos.json` è in `.gitignore` — viene generato a build-time.

**Fallback a runtime:** se `repos.json` non è disponibile (dev locale senza build), `useGitHubRepos` fetcha direttamente l'API pubblica di GitHub.

---

## Personalizzare i contenuti

### Hero, bio e social

Modifica `src/data/hero.ts`.

### Esperienze

Modifica `src/data/esperienze.ts`, aggiungi un oggetto `Esperienza`:

```typescript
{
  ruolo: 'Frontend Developer',
  organizzazione: 'Nome Azienda',
  luogo: 'Città, Provincia',
  periodo: 'Gen 2025 - Oggi',
  descrizione: 'Descrizione del ruolo...',
  voto: '110/110',   // Opzionale
  tags: ['React', 'TypeScript'],
}
```

### Progetti GitHub

Le repo compaiono automaticamente dall'API. Per customizzarne una, aggiungi un'entry in `publicRepoConfigs` dentro `src/data/progetti.ts`:

```typescript
{
  repoName: 'nome-repo',           // Deve matchare esattamente il nome su GitHub
  featured: true,                  // Mostra in cima alla griglia
  image: 'https://...',            // Override immagine (sovrascrive quella dal README)
  siteUrl: 'https://demo.com',     // Override link sito (sovrascrive homepage GitHub)
  description: 'Testo custom',     // Override descrizione
  tags: ['Tag1', 'Tag2'],          // Tag aggiuntivi
  objectFit: 'contain',            // 'cover' (default) | 'contain'
  bgColor: '#1a1a2e',              // Colore sfondo se objectFit: 'contain'
  hideGithubLink: true,            // Nasconde bottone GitHub
  hideSiteLink: true,              // Nasconde bottone Sito
  hidden: true,                    // Nasconde completamente la repo
}
```

### Progetti privati / esterni

Aggiungi in `privateProjects` dentro `src/data/progetti.ts`:

```typescript
{
  title: 'Nome Progetto',
  description: 'Descrizione...',
  image: 'https://...',
  tags: ['Godot', 'GDScript'],
  type: 'web' | 'mobile' | 'altro',
  siteUrl: 'https://...',    // Opzionale
  repoUrl: 'https://...',    // Opzionale
}
```

### Artwork

Modifica `src/data/artwork.ts`. Ogni gruppo ha:

```typescript
{
  tipo: 'brutalism',
  label: 'Brutalism',
  layout: 'grid' | 'masonry',
  defaultOpen: true,
  items: [
    {
      titolo: 'Titolo opera',
      src: 'https://cloudinary.com/...',
      thumbnail: 'https://...',   // Solo per video
      anno: 2024,
      numero: 1,
      descrizione: 'Descrizione...',
    }
  ]
}
```

---

## Deploy

Il deploy è automatico via GitHub Actions (`.github/workflows/deploy.yml`):

- **Trigger:** push su `main`, esecuzione manuale, o schedule giornaliero alle 06:00 UTC
- **Build:** Node 24, `npm ci`, `npm run build` (con `REPOS_TOKEN` da secrets)
- **Deploy:** `actions/deploy-pages@v4` su GitHub Pages
- **URL:** [stenosi.github.io](https://stenosi.github.io)

---

## Styling

Il tema è definito in `src/index.css` con CSS custom properties:

| Token                      | Valore           | Uso                        |
| -------------------------- | ---------------- | -------------------------- |
| `--color-foreground`       | `#000000`        | Testi, bordi, sfondi hover |
| `--color-background`       | `#ffffff`        | Sfondo principale          |
| `--color-muted`            | `#f5f5f5`        | Sfondi secondari           |
| `--color-muted-foreground` | `#525252`        | Testi secondari            |
| `--font-display`           | Playfair Display | Titoli                     |
| `--font-body`              | Source Serif 4   | Testi corpo                |
| `--font-mono`              | JetBrains Mono   | Tag, label, codice         |

Il design è intenzionalmente squadrato (`border-radius: 0`) con palette monocromatica bianco/nero.
