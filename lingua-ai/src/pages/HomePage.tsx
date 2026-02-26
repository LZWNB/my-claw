import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { Localization } from '../components/Localization';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Localization />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
