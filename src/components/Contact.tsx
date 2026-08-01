import { profile } from '../data/content';
import { IconArrow, IconGitHub, IconLinkedIn, IconMail, IconPhone, IconPin } from './Icons';
import Reveal from './Reveal';

const channels = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: <IconMail size={21} />,
    external: false,
  },
  {
    label: 'Phone',
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
    icon: <IconPhone size={21} />,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'mohit-parmar-729717185',
    href: profile.linkedin,
    icon: <IconLinkedIn size={19} />,
    external: true,
  },
  {
    label: 'GitHub',
    value: `@${profile.githubUser}`,
    href: profile.github,
    icon: <IconGitHub size={20} />,
    external: true,
  },
  {
    label: 'Location',
    value: profile.location,
    href: null,
    icon: <IconPin size={21} />,
    external: false,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section section--tint">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Contact</span>
          <h2 className="section-title">
            Let&apos;s build <span className="gradient-text">something solid</span>
          </h2>
          <p className="section-sub">
            Open to senior full stack roles and interesting product work. The quickest route is
            email — I reply to everything.
          </p>
        </Reveal>

        <div className="contact__grid">
          {channels.map((channel, index) => {
            const inner = (
              <>
                <div className="contact-card__icon">{channel.icon}</div>
                <div className="contact-card__label">{channel.label}</div>
                <div className="contact-card__value">{channel.value}</div>
              </>
            );

            return (
              <Reveal key={channel.label} delay={index * 60}>
                {channel.href ? (
                  <a
                    className="card contact-card"
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noreferrer noopener' }
                      : {})}
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="card contact-card">{inner}</div>
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="contact__cta">
          <a className="btn btn--primary" href={`mailto:${profile.email}`}>
            Send me an email
            <IconArrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
