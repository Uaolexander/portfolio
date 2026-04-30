import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { BotDemo } from '@/components/BotDemo';
import { About } from '@/components/About';
import { Stats } from '@/components/Stats';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CursorSpotlight } from '@/components/CursorSpotlight';
import { ScrollReset } from '@/components/ScrollReset';

export default function Home() {
  return (
    <>
      <ScrollReset />
      <CursorSpotlight />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <BotDemo />
        <About />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
