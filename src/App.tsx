import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import GitHubStats from './components/GitHubStats';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Industries from './components/Industries';
import Nav from './components/Nav';
import Projects from './components/Projects';
import ResumeCta from './components/ResumeCta';
import Services from './components/Services';
import Skills from './components/Skills';
import Timeline from './components/Timeline';

export default function App() {
  return (
    <>
      <div className="backdrop" aria-hidden>
        <div className="backdrop__grid" />
        <div className="backdrop__glow" />
      </div>

      <Nav />

      <main>
        <Hero />
        <About />
        <Impact />
        <Experience />
        <Industries />
        <Skills />
        <Projects />
        <Timeline />
        <Services />
        <GitHubStats />
        <ResumeCta />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
