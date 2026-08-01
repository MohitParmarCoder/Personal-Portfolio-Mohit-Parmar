import { experience } from '../data/content';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Experience</span>
          <h2 className="section-title">
            Nearly five years of <em>shipping production software</em>
          </h2>
          <p className="section-sub">
            Product names and clients are generalised — the work below is described by capability
            rather than by customer, in line with contractual confidentiality.
          </p>
        </Reveal>

        <div className="exp">
          {experience.map((job, index) => (
            <Reveal key={job.company} delay={index * 90}>
              <article className="card exp__card">
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

                <div className="exp__metrics">
                  {job.metrics.map((metric) => (
                    <div className="exp__metric" key={metric.label}>
                      <b>{metric.value}</b>
                      <span>{metric.label}</span>
                    </div>
                  ))}
                </div>

                <h4 className="exp__label">Products worked on</h4>
                <div className="exp__products">
                  {job.products.map((product) => (
                    <div className="product" key={product.name}>
                      <h4>{product.name}</h4>
                      <ul>
                        {product.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <h4 className="exp__label">What I was responsible for</h4>
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
