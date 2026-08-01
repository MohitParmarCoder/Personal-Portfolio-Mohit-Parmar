import { profile } from '../data/content';
import { useGitHubStats } from '../hooks';
import { IconArrow, IconGitHub } from './Icons';
import Reveal from './Reveal';

/**
 * Live counters from the public GitHub API. When the request cannot be made —
 * rate limiting, offline preview, a restrictive network — the section degrades
 * to a plain profile link instead of surfacing an error to visitors.
 */
export default function GitHubStats() {
  const { stats, state } = useGitHubStats(profile.githubUser);

  const cards = [
    { label: 'Public repositories', value: stats?.repos },
    { label: 'Followers', value: stats?.followers },
    { label: 'Following', value: stats?.following },
    { label: 'On GitHub since', value: stats?.memberSince },
  ];

  return (
    <section className="section">
      <div className="container">
        <Reveal className="section-head section-head--center">
          <span className="eyebrow">Coding activity</span>
          <h2 className="section-title">
            On <span className="gradient-text">GitHub</span>
          </h2>
        </Reveal>

        {state === 'error' ? (
          <Reveal>
            <p className="gh__note" style={{ marginTop: 0 }}>
              Live GitHub statistics could not be loaded right now.{' '}
              <a href={profile.github} target="_blank" rel="noreferrer noopener">
                Browse the profile directly →
              </a>
            </p>
          </Reveal>
        ) : (
          <>
            <div className="gh">
              {cards.map((card, index) => (
                <Reveal key={card.label} delay={index * 70}>
                  <div className="card gh__card">
                    <div className="gh__value gradient-text">
                      {state === 'loading' ? '—' : (card.value ?? '—')}
                    </div>
                    <div className="gh__label">{card.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <p className="gh__note">
              <a href={profile.github} target="_blank" rel="noreferrer noopener">
                <IconGitHub size={15} /> @{profile.githubUser} <IconArrow size={13} />
              </a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
