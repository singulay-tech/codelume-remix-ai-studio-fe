import { Hero } from '@/components/Hero'
import { Portfolio } from '@/components/Portfolio'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { WorkshopTeaser } from '@/components/WorkshopTeaser'
import { AboutUs } from '@/components/AboutUs'
import { Footer } from '@/components/Footer'

export function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <Portfolio />
        <About />
        <Services />
        <WorkshopTeaser />
        <AboutUs />
      </main>
      <Footer />
    </div>
  )
}
