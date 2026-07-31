import { useEffect, useState } from 'react';
import { navLinks, profile } from '../data/content';
import { useActiveSection, useScrolledPast, useTheme } from '../hooks';
import { asset } from '../utils';
import { IconClose, IconDownload, IconMenu, IconMoon, IconSun } from './Icons';

const sectionIds = navLinks.map((link) => link.id);

export default function Nav() {
  const scrolled = useScrolledPast(24);
  const active = useActiveSection(sectionIds);
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  // A menu left open while the viewport grows would otherwise stay stuck on screen.
  useEffect(() => {
    const onResize = () => window.innerWidth > 940 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#home" className="nav__brand" onClick={() => setOpen(false)}>
          <span className="nav__mark">MP</span>
          <span>Mohit Parmar</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <IconSun /> : <IconMoon />}
          </button>

          <a className="btn btn--primary" href={asset(profile.resume)} download>
            <IconDownload />
            Résumé
          </a>

          <button
            type="button"
            className="icon-btn nav__burger"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="nav__mobile">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            className="btn btn--primary"
            href={asset(profile.resume)}
            download
            style={{ marginTop: 16 }}
            onClick={() => setOpen(false)}
          >
            <IconDownload />
            Download résumé
          </a>
        </div>
      )}
    </header>
  );
}
