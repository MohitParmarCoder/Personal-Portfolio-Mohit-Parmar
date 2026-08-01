import { experience, impact } from '../data/content';
import Reveal from './Reveal';

/**
 * The impact figures live here rather than in a section of their own — they are
 * the outcome of this work, and separating them meant reading the same numbers
 * twice. Products are described once, on the project cards.
 */
export default function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">
            Nearly five years <em>shipping to production</em>
          </h2>
          <p className="section-sub">
            Client and product names are generalised — the work is described by capability rather
            than by customer, in line with contractual confidentiality.
          </p>
        </Reveal>

        <div className="impact">
          {impact.map((item, index) => (
            <Reveal key={item.label} delay={index * 50}>
              <div className="impact__item">
                <div className="impact__value">{item.value}</div>
                <div className="impact__label">{item.label}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="impact__note">Figures as reported in delivery reviews, 2021–2025</p>

        <div className="exp">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 80}>
              <article className="panel exp__card">
                <header className="exp__head">
                  <div>
                    <h3 className="exp__role">{job.role}</h3>
                    <div className="exp__company">
                      {job.company}
                      {job.current && <span className="badge-now">Current</span>}
                    </div>
                  </div>
                  <div className="exp__when">
                    {job.period}
                    <small>{job.duration}</small>
                  </div>
                </header>

                <p className="exp__summary">{job.summary}</p>

                <ul className="exp__resp">
                  {job.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="exp__stack chip-row">
                  {job.stack.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
