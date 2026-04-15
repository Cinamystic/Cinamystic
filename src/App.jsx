import { useState, useCallback } from 'react';
import useMousePosition from './hooks/useMousePosition';
import useSmoothScroll from './hooks/useSmoothScroll';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import Navbar from './components/ui/Navbar';
import HeroSkills from './components/sections/HeroSkills';
import Portfolio from './components/sections/Portfolio';
import Testimonials from './components/sections/Testimonials';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Contact from './components/sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const mouse = useMousePosition();
  useSmoothScroll();

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Loader onComplete={handleLoaderComplete} />
      <Cursor />
      <Navbar />

      <main>
        <HeroSkills mouse={mouse} />
        <Portfolio />
        <Testimonials />
        <Services />
        <About />
        <Contact />
      </main>
    </>
  );
}
