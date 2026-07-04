import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Esperienze } from './components/sections/Esperienze'
import { ProgettiGitHub } from './components/sections/ProgettiGitHub'
import { Artwork } from './components/sections/Artwork'
import { SectionRule } from './components/ui/SectionRule'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SectionRule />
        <Esperienze />
        <SectionRule />
        <ProgettiGitHub />
        <SectionRule />
        <Artwork />
      </main>
      <Footer />
    </>
  )
}

export default App
