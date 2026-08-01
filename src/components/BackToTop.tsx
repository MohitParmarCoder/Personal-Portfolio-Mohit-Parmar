import { useScrolledPast } from '../hooks';
import { IconArrowUp } from './Icons';

export default function BackToTop() {
  const visible = useScrolledPast(600);

  return (
    <button
      type="button"
      className={`to-top ${visible ? 'is-visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
    >
      <IconArrowUp />
    </button>
  );
}
