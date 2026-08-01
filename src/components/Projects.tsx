import { useMemo, useState, type MouseEvent } from 'react';
import { projects, type Project } from '../data/content';
import { IconArrow, IconTrend } from './Icons';
import Reveal from './Reveal';

const categories = ['All', 'Fintech', 'Enterprise', 'Platform', 'CRM', 'Personal'] as const;
type Category = (typeof categories)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Tracks the pointer so the hover glow follows the cursor across the card.
  const onMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article
      className="panel project"
      onMouseMove={onMove}
      style={{ animationDelay: `${Math.min(index, 8) * 50}ms` }}
    >
      <div className="project__top">
        <span className="project__icon" aria-hidden>
          {project.icon}
        </span>
        <span className="project__domain">{project.domain}</span>
      </div>

      <h3>{project.title}</h3>
      <p className="project__blurb">{project.blurb}</p>

      {project.impact && (
        <p className="project__impact">
          <IconTrend size={15} />
          {project.impact}
        </p>
      )}

      <div className="chip-row project__stack">
        {project.stack.map((tech) => (
          <span className="chip" key={tech}>
            {tech}
          </span>
        ))}
      </div>

      <div className="project__foot">
        <span className={`project__status ${project.status ? 'project__status--wip' : ''}`}>
          {project.status ?? 'Delivered'}
        </span>

        {project.links && (
          <span className="project__links">
            {project.links.map((link) => (
              <a
                key={link.href}
                className="project__link"
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
              >
                {link.label}
                <IconArrow size={13} />
              </a>
            ))}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<Category>('All');

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="section section--tint">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Work</span>
          <h2 className="section-title">
            Selected <em>projects</em>
          </h2>
          <p className="section-sub">
            Each card is one system — what it does, the industry it serves, and what it was built
            with.
          </p>
        </Reveal>

        <Reveal>
          {/* Toggle buttons rather than tabs: they filter one grid in place,
              they do not swap between panels. */}
          <div className="filters" role="group" aria-label="Filter projects by type">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter ${filter === category ? 'is-active' : ''}`}
                onClick={() => setFilter(category)}
                aria-pressed={filter === category}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects__grid">
          {visible.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
