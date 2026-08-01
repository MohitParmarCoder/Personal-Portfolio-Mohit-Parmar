import { about, education, services } from '../data/content';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About</span>
          <h2 className="section-title">
            Engineering that solves the <em>business problem</em>
          </h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            {about.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </Reveal>

          <div className="about__aside">
            <Reveal delay={80}>
              <div className="panel">
                <h3 className="panel__title">Education</h3>
                {education.map((entry) => (
                  <div className="edu" key={entry.degree}>
                    <div className="edu__degree">{entry.degree}</div>
                    <div className="edu__school">{entry.school}</div>
                    <div className="edu__foot">
                      <span>{entry.period}</span>
                      <span className="edu__grade">{entry.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="panel">
                <h3 className="panel__title">What I do</h3>
                <ul className="about__services">
                  {services.map((service) => (
                    <li key={service.title}>
                      <span aria-hidden>{service.icon}</span>
                      {service.title}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
