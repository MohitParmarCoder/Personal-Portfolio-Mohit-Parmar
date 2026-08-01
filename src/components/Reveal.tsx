import type { CSSProperties, ReactNode } from 'react';
import { useReveal } from '../hooks';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export default function Reveal({ children, delay = 0, className = '', style }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
