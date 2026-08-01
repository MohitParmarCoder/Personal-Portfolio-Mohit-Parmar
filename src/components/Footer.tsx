import { profile } from '../data/content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <span>
          © {new Date().getFullYear()} {profile.name}. Built with React, TypeScript and Vite.
        </span>
        <nav className="footer__links" aria-label="Footer">
          <a href={profile.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer noopener">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}
