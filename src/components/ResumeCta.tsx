import { profile } from '../data/content';
import { asset } from '../utils';
import { IconArrow, IconDownload } from './Icons';
import Reveal from './Reveal';

export default function ResumeCta() {
  return (
    <section id="resume" className="section" style={{ paddingBlock: '0 clamp(72px, 10vw, 128px)' }}>
      <div className="container">
        <Reveal>
          <div className="resume">
            <div className="resume__text">
              <span className="eyebrow">Résumé</span>
              <h3>Take the full version with you</h3>
              <p>
                A one-page PDF covering my experience, education, technical skills and the platforms
                I have delivered — ready to forward to a hiring team.
              </p>
            </div>

            <div className="resume__actions">
              <a className="btn btn--primary" href={asset(profile.resume)} download>
                <IconDownload />
                Download PDF
              </a>
              <a
                className="btn btn--ghost"
                href={asset(profile.resume)}
                target="_blank"
                rel="noreferrer noopener"
              >
                Open in browser
                <IconArrow />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
