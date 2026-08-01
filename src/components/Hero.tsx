import { heroStats, profile, roleRotation } from '../data/content';
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

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: count } = useCountUp(value);

  return (
    <div className="stat" ref={ref}>
      <div className="stat__value">
        {count}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
    </div>
  );
}

export default function Hero() {
  const typed = useTypewriter(roleRotation);

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero__grid">
          <div>
            <div className="hero__badge">
              <span className="hero__pulse" />
              {profile.availability}
            </div>

            <h1 className="hero__name">
              Hi, I&apos;m <em>Mohit Parmar</em>
            </h1>

            <p className="hero__role">
              {typed}
              <span className="cursor" />
            </p>

            <p className="hero__tagline">{profile.tagline}</p>

            <div className="hero__meta">
              <span>
                <IconPin size={15} />
                {profile.location}
              </span>
              <a href={`mailto:${profile.email}`}>
                <IconMail size={15} />
                {profile.email}
              </a>
              <a href={`tel:${profile.phoneHref}`}>
                <IconPhone size={15} />
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

          <div className="hero__portrait">
            <span className="hero__ring" aria-hidden />
            <img
              className="hero__photo"
              src={asset(profile.photo)}
              width={760}
              height={760}
              alt="Mohit Parmar"
              fetchPriority="high"
            />
            <span className="hero__tagpill hero__tagpill--a">
              <b>5</b> yrs experience
            </span>
            <span className="hero__tagpill hero__tagpill--b">
              <b>10</b> industries
            </span>
          </div>
        </div>

        <div className="hero__stats">
          {heroStats.map((stat) => (
            <Stat key={stat.label} value={stat.value} suffix={stat.suffix} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
