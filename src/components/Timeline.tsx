import { timeline } from '../data/content';
import Reveal from './Reveal';

export default function Timeline() {
  return (
    <section id="timeline" className="section section--tint">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Timeline</span>
          <h2 className="section-title">
            Career and <span className="gradient-text">education</span>
          </h2>
        </Reveal>

        <div className="timeline">
          {timeline.map((entry, index) => (
            <Reveal key={`${entry.title}-${entry.period}`} delay={index * 80}>
              <div className={`tl-item tl-item--${entry.kind}`}>
                <div className="tl-period">{entry.period}</div>
                <h3 className="tl-title">{entry.title}</h3>
                <div className="tl-place">{entry.place}</div>
                <p className="tl-detail">{entry.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
