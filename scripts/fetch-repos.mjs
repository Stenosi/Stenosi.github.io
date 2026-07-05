import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = resolve(__dirname, '../public/repos.json')
const USERNAME = 'Stenosi'
const TOKEN = process.env.REPOS_TOKEN

const BASE_HEADERS = {
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  ...(TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {}),
}

async function fetchAllPages(url) {
  const repos = []
  let page = 1
  while (true) {
    const res = await fetch(`${url}&page=${page}&per_page=100`, { headers: BASE_HEADERS })
    if (!res.ok) throw new Error(`GitHub API error ${res.status}: ${await res.text()}`)
    const data = await res.json()
    repos.push(...data)
    if (data.length < 100) break
    page++
  }
  return repos
}

const BADGE_PATTERNS = [
  /img\.shields\.io/,
  /badge\.fury\.io/,
  /travis-ci\.(org|com)/,
  /codecov\.io/,
  /circleci\.com/,
  /app\.codacy\.com/,
  /github\.com\/[^/]+\/[^/]+\/actions\/workflows\/.+\.svg/,
  /github\.com\/[^/]+\/[^/]+\/workflows\/.+\.svg/,
  /raw\.githubusercontent\.com\/[^/]+\/[^/]+\/.+\.svg(\?|$)/,
  /\/badge(s)?\//i,
  /badge\.svg(\?|$)/i,
  /api\.netlify\.com\/api\/v1\/badges/,
  /vercel\.com\/button/,
  /deploy\.workers\.cloudflare\.com/,
  /bettercodehub\.com/,
  /snyk\.io\/test/,
  /david-dm\.org/,
  /dependabot/i,
]

function isBadge(url) {
  return BADGE_PATTERNS.some((pattern) => pattern.test(url))
}

function extractImages(text, ownerLogin, repoName, branch) {
  const images = []

  // Raccoglie tutti i match markdown: ![alt](url)
  for (const match of text.matchAll(/!\[.*?\]\(([^)\s]+)\)/g)) {
    const url = match[1]
    if (url.startsWith('http')) {
      images.push(url)
    } else {
      const rel = url.replace(/^\.?\//, '')
      images.push(`https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${branch}/${rel}`)
    }
  }

  // Raccoglie tutti i match HTML: <img src="...">
  for (const match of text.matchAll(/<img[^>]+src=["']([^"']+)["']/g)) {
    images.push(match[1])
  }

  return images
}

async function fetchReadmeFirstImage(ownerLogin, repoName) {
  for (const branch of ['main', 'master']) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${ownerLogin}/${repoName}/${branch}/README.md`,
        { headers: BASE_HEADERS },
      )
      if (!res.ok) continue
      const text = await res.text()

      const candidates = extractImages(text, ownerLogin, repoName, branch)
      const image = candidates.find((url) => !isBadge(url))
      if (image) return image
    } catch {
      // branch non esiste o errore di rete, si prova il prossimo
    }
  }
  return null
}

async function fetchLanguages(ownerLogin, repoName) {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${ownerLogin}/${repoName}/languages`,
      { headers: BASE_HEADERS },
    )
    if (!res.ok) return []
    const data = await res.json()
    // Ordina per byte (decrescente) e restituisce solo i nomi
    return Object.entries(data)
      .sort(([, a], [, b]) => b - a)
      .map(([lang]) => lang)
  } catch {
    return []
  }
}

// Esegue fetch in batch da N per non saturare la rate limit
async function inBatches(items, batchSize, fn) {
  const results = []
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize)
    const batchResults = await Promise.all(batch.map(fn))
    results.push(...batchResults)
  }
  return results
}

async function main() {
  let repos = []

  if (TOKEN) {
    console.log('🔑  Token trovato - fetch con affiliation=owner,collaborator,organization_member')
    repos = await fetchAllPages(
      'https://api.github.com/user/repos?affiliation=owner,collaborator,organization_member&sort=updated',
    )
  } else {
    console.warn('⚠️   REPOS_TOKEN non trovato - uso API pubblica (solo repo proprie)')
    repos = await fetchAllPages(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated`,
    )
  }

  const filtered = repos.filter((r) => !r.fork && !r.archived)
  console.log(`   ${filtered.length} repo dopo filtro fork/archived`)

  console.log('   Fetch immagini README...')
  const readmeImages = await inBatches(filtered, 5, (r) =>
    fetchReadmeFirstImage(r.owner.login, r.name),
  )

  console.log('   Fetch linguaggi...')
  const languagesPerRepo = await inBatches(filtered, 5, (r) =>
    fetchLanguages(r.owner.login, r.name),
  )

  const slim = filtered.map((r, i) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    html_url: r.html_url,
    homepage: r.homepage,
    language: r.language,
    languages: languagesPerRepo[i],
    stargazers_count: r.stargazers_count,
    topics: r.topics ?? [],
    fork: false,
    archived: false,
    readmeImage: readmeImages[i] ?? null,
  }))

  writeFileSync(OUTPUT_PATH, JSON.stringify(slim, null, 2))
  console.log(`✓  ${slim.length} repo scritte in public/repos.json`)
}

main().catch((err) => {
  console.error('✗  Errore durante fetch repos:', err.message)
  writeFileSync(OUTPUT_PATH, '[]')
  process.exit(0)
})
