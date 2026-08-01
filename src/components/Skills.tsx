import { skillGroups, techStack } from '../data/content';
import { SkillIcon } from './Icons';
import Reveal from './Reveal';

const half = Math.ceil(techStack.length / 2);
const rowOne = techStack.slice(0, half);
const rowTwo = techStack.slice(half);

function Marquee({ items, reverse }: { items: readonly string[]; reverse?: boolean }) {
  return (
    <div className={`marquee ${reverse ? 'marquee--reverse' : ''}`}>
      {/* The list is duplicated so the track can loop seamlessly at -50%. */}
      <div className="marquee__track">
        {[...items, ...items].map((tech, index) => (
          <span className="chip" key={`${tech}-${index}`}>
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">
            The <span className="gradient-text">toolkit</span> I build with
          </h2>
          <p className="section-sub">
            Full stack across the whole delivery path — interface, API, data layer, cloud and the
            testing that keeps it honest.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 70}>
              <article className="card skill-card">
                <div className="skill-card__icon">
                  <SkillIcon name={group.icon} />
                </div>
                <h3>{group.title}</h3>
                <div className="chip-row">
                  {group.skills.map((skill) => (
                    <span className="chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} style={{ marginTop: 56 }}>
          <h3 className="exp__label" style={{ textAlign: 'center', marginBottom: 20 }}>
            Tech stack
          </h3>
          <Marquee items={rowOne} />
          <Marquee items={rowTwo} reverse />
        </Reveal>
      </div>
    </section>
  );
}
