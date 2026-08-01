import { profile } from '../data/content';
import { asset } from '../utils';
import {
  IconArrow,
  IconDownload,
  IconGitHub,
  IconInstagram,
  IconLinkedIn,
  IconMail,
  IconPhone,
} from './Icons';
import Reveal from './Reveal';

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <IconMail size={19} />,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
    icon: <IconPhone size={19} />,
  },
  {
    label: 'LinkedIn',
    value: profile.linkedinHandle,
    href: profile.linkedin,
    icon: <IconLinkedIn size={17} />,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.githubUser,
    href: profile.github,
    icon: <IconGitHub size={18} />,
    external: true,
  },
  {
    label: 'Instagram',
    value: profile.instagramHandle,
    href: profile.instagram,
    icon: <IconInstagram size={18} />,
    external: true,
  },
];

/** Closing section: the résumé download sits with the other ways to reach him. */
export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">
            Let&apos;s build <em>something solid</em>
          </h2>
          <p className="section-sub">
            Open to senior full stack roles and interesting product work. Email is quickest — I
            reply to everything.
          </p>
        </Reveal>

        <Reveal>
          <div className="cta">
            <div>
              <h3>Take the full résumé with you</h3>
              <p>
                One page covering experience, education, technical skills and the platforms
                delivered.
              </p>
            </div>
            <div className="cta__actions">
              <a className="btn btn--primary" href={asset(profile.resume)} download>
                <IconDownload />
                Download résumé
              </a>
              <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
                Email me
                <IconArrow />
              </a>
            </div>
          </div>
        </Reveal>

        <div className="contact__grid">
          {channels.map((channel, index) => (
            <Reveal key={channel.label} delay={index * 55}>
              <a
                className="panel contact-card"
                href={channel.href}
                {...(channel.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
              >
                <span className="contact-card__icon">{channel.icon}</span>
                <span className="contact-card__label">{channel.label}</span>
                <span className="contact-card__value">{channel.value}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
