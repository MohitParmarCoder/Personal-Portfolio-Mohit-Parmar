import { impact } from '../data/content';
import Reveal from './Reveal';

/**
 * Measured outcomes rather than adjectives. Every figure here is quoted from
 * Mohit's CV — the note under the grid says so, so nothing reads as invented.
 */
export default function Impact() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Impact</span>
          <h2 className="section-title">
            What the work actually <em>moved</em>
          </h2>
          <p className="section-sub">
            Shipping is the easy claim to make. These are the numbers attached to it.
          </p>
        </Reveal>

        <div className="impact__grid">
          {impact.map((item, index) => (
            <Reveal key={item.label} delay={index * 60}>
              <article className="card metric">
                <div className="metric__value">{item.value}</div>
                <div className="metric__label">{item.label}</div>
                <p className="metric__detail">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="impact__note">
            Figures as reported in delivery reviews across 2021–2025
          </p>
        </Reveal>
      </div>
    </section>
  );
}
