import { heroStats, profile } from '../data/content';
import { useCountUp, useTypewriter } from '../hooks';
import { asset } from '../utils';
import {
  IconArrow,
  IconDownload,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconPhone,
  IconPin,
} from './Icons';

const roles = [
  'Senior Full Stack Developer',
  'React.js Specialist',
  'Node.js & TypeScript Engineer',
  'AWS Serverless Developer',
  'AI-Assisted Development Advocate',
];

function Stat({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(Number(value));

  return (
    <div className="stat" ref={ref}>
      <div className="stat__value gradient-text">
        {count}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(roles);

  return (
    <section id="home" className="hero">
      <div className="container hero__grid">
        <div>
          <div className="hero__badge">
            <span className="hero__pulse" />
            {profile.availability}
          </div>

          <h1 className="hero__name">
            Hi, I&apos;m <span className="gradient-text">Mohit Parmar</span>
          </h1>

          <p className="hero__role">
            {typed}
            <span className="cursor" />
          </p>

          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__meta">
            <span>
              <IconPin size={16} />
              {profile.location}
            </span>
            <a href={`mailto:${profile.email}`}>
              <IconMail size={16} />
              {profile.email}
            </a>
            <a href={`tel:${profile.phoneHref}`}>
              <IconPhone size={16} />
              {profile.phone}
            </a>
          </div>

          <div className="hero__cta">
            <a className="btn btn--primary" href="#projects">
              View my work
              <IconArrow />
            </a>
            <a className="btn btn--ghost" href={asset(profile.resume)} download>
              <IconDownload />
              Download résumé
            </a>
          </div>

          <div className="hero__socials">
            <a
              className="icon-btn"
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
            >
              <IconGitHub size={18} />
            </a>
            <a
              className="icon-btn"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
            >
              <IconLinkedIn size={17} />
            </a>
            <a className="icon-btn" href={`mailto:${profile.email}`} aria-label="Send an email">
              <IconMail size={18} />
            </a>
          </div>
        </div>

        <div className="hero__stats">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>

      <div className="hero__scroll" aria-hidden>
        Scroll
        <span />
      </div>
    </section>
  );
}
