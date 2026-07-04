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

async function main() {
  let repos = []

  if (TOKEN) {
    console.log('🔑  Token trovato — fetch con affiliation=owner,collaborator')
    repos = await fetchAllPages(
      'https://api.github.com/user/repos?affiliation=owner,collaborator&sort=updated'
    )
  } else {
    console.warn('⚠️   GITHUB_API_TOKEN non trovato — uso API pubblica (solo repo proprie)')
    repos = await fetchAllPages(
      `https://api.github.com/users/${USERNAME}/repos?sort=updated`
    )
  }

  const filtered = repos.filter((r) => !r.fork && !r.archived)

  // Mantieni solo i campi necessari per ridurre la dimensione del file
  const slim = filtered.map(({ id, name, description, html_url, homepage, language, stargazers_count, topics }) => ({
    id,
    name,
    description,
    html_url,
    homepage,
    language,
    stargazers_count,
    topics,
    fork: false,
    archived: false,
  }))

  writeFileSync(OUTPUT_PATH, JSON.stringify(slim, null, 2))
  console.log(`✓  ${slim.length} repo scritte in public/repos.json`)
}

main().catch((err) => {
  console.error('✗  Errore durante fetch repos:', err.message)
  writeFileSync(OUTPUT_PATH, '[]')
  // Non far fallire la build — il sito mostrerà i placeholder
  process.exit(0)
})
