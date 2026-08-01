import { skillGroups } from '../data/content';
import { SkillIcon } from './Icons';
import Reveal from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Skills</span>
          <h2 className="section-title">
            The <em>toolkit</em>
          </h2>
          <p className="section-sub">
            Full stack across the whole delivery path — interface, API, data layer, cloud and the
            testing that keeps it honest.
          </p>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.title} delay={index * 60}>
              <article className="panel skill">
                <div className="skill__head">
                  <span className="skill__icon">
                    <SkillIcon name={group.icon} />
                  </span>
                  <h3>{group.title}</h3>
                </div>
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
      </div>
    </section>
  );
}
