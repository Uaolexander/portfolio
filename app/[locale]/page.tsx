import { CursorSpotlight } from '@/components/CursorSpotlight';
import { LeftColumn } from '@/components/LeftColumn';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Services } from '@/components/Services';
import { Process } from '@/components/Process';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <CursorSpotlight />
      <div className="lg:flex lg:items-start max-w-[1400px] mx-auto">
        {/* Left column: sticky on desktop, normal on mobile */}
        <aside className="lg:sticky lg:top-0 lg:h-screen lg:w-2/5 lg:flex-shrink-0 lg:overflow-y-auto">
          <LeftColumn />
        </aside>

        {/* Right column: scrolling content */}
        <main className="lg:w-3/5 lg:min-h-screen">
          <About />
          <Projects />
          <Services />
          <Process />
          <Contact />
          <Footer />
        </main>
      </div>
    </>
  );
}
