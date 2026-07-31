import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import GitHubStats from './components/GitHubStats';
import Hero from './components/Hero';
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
        <div className="backdrop__orb backdrop__orb--a" />
        <div className="backdrop__orb backdrop__orb--b" />
      </div>

      <Nav />

      <main>
        <Hero />
        <About />
        <Experience />
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
