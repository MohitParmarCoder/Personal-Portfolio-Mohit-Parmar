import { about, education } from '../data/content';
import Reveal from './Reveal';

export default function About() {
  return (
    <section id="about" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">About me</span>
          <h2 className="section-title">
            Engineering that <em>solves the business problem</em>
          </h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            {about.intro.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
            <p className="about__summary">{about.summary}</p>
          </Reveal>

          <div className="about__aside">
            <Reveal delay={80}>
              <div className="card">
                <h3 style={{ fontSize: '1rem', marginBottom: 16 }}>What I bring</h3>
                <ul className="about__highlights">
                  {about.highlights.map((item) => (
                    <li key={item}>
                      <span className="tick" aria-hidden>
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {education.map((entry, index) => (
              <Reveal key={entry.degree} delay={140 + index * 70}>
                <div className="card">
                  <div className="edu-card__degree">{entry.degree}</div>
                  <div className="edu-card__school">{entry.school}</div>
                  <div className="edu-card__foot">
                    <span>{entry.period}</span>
                    <span className="edu-card__grade">{entry.grade}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
