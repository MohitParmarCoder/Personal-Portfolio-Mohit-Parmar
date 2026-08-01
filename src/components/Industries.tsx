import { industries } from '../data/content';
import Reveal from './Reveal';

/**
 * Domain breadth is the strongest single signal in this CV, so it gets its own
 * section rather than being buried inside the project list.
 */
export default function Industries() {
  return (
    <section id="industries" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Domains</span>
          <h2 className="section-title">
            Ten industries, one <em>engineering approach</em>
          </h2>
          <p className="section-sub">
            Every domain below is one I have shipped production software into. The business rules
            change completely; the discipline of modelling them properly does not.
          </p>
        </Reveal>

        <div className="industries__grid">
          {industries.map((industry, index) => (
            <Reveal key={industry.name} delay={Math.min(index, 6) * 55}>
              <article className="card industry">
                <div className="industry__top">
                  <div className="industry__icon" aria-hidden>
                    {industry.icon}
                  </div>
                  <h3>{industry.name}</h3>
                </div>
                <p>{industry.blurb}</p>
                <div className="industry__built">
                  {industry.built.map((item) => (
                    <span key={item}>{item}</span>
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
