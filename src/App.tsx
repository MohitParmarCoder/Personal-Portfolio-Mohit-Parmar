import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Nav from './components/Nav';
import Projects from './components/Projects';
import Skills from './components/Skills';

/**
 * Six sections, each saying one thing. An earlier cut had twelve, and the
 * products, domains and capabilities were each restated three times over —
 * Impact folds into Experience, domains live on the project cards, and the
 * résumé download sits with the rest of the contact routes.
 */
export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden>
        <div className="backdrop__grid" />
        <div className="backdrop__glow backdrop__glow--a" />
        <div className="backdrop__glow backdrop__glow--b" />
      </div>

      <Nav />

      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
