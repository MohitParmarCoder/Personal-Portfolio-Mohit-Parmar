import { services, whyHireMe } from '../data/content';
import Reveal from './Reveal';

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">What I do</span>
          <h2 className="section-title">
            Where I add <span className="gradient-text">the most value</span>
          </h2>
        </Reveal>

        <div className="services__grid">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={index * 55}>
              <article className="card service">
                <div className="service__icon" aria-hidden>
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="hire">
            <span className="eyebrow">Why hire me</span>
            <h3 className="section-title" style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.1rem)' }}>
              What you get on day one
            </h3>
            <ul className="hire__grid">
              {whyHireMe.map((item) => (
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
      </div>
    </section>
  );
}
