import { useCallback, useEffect, useRef, useState } from 'react';

/** Adds `is-visible` to an element the first time it scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/** Tracks which section id is currently closest to the top of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const onScroll = () => {
      const line = window.innerHeight * 0.32;
      let current = ids[0] ?? '';

      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }

      // The last section rarely reaches the trigger line, so pin it at the bottom.
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
        current = ids[ids.length - 1] ?? current;
      }

      setActive(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [ids]);

  return active;
}

/** True once the page has scrolled past `offset` pixels. */
export function useScrolledPast(offset: number) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return past;
}

export type Theme = 'dark' | 'light';

const THEME_KEY = 'mp-portfolio-theme';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark';
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === 'light' || stored === 'dark' ? stored : 'dark';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem(THEME_KEY, theme);
    } catch {
      // Storage can be unavailable in private browsing; the theme still applies.
    }
  }, [theme]);

  const toggle = useCallback(
    () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  );

  return { theme, toggle };
}

/** Cycles through phrases with a type-on / type-off effect. */
export function useTypewriter(phrases: readonly string[], speed = 65, pause = 1900) {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const phrase = phrases[index % phrases.length] ?? '';

    if (!deleting && text === phrase) {
      const timer = window.setTimeout(() => setDeleting(true), pause);
      return () => window.clearTimeout(timer);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = window.setTimeout(
      () => {
        setText((current) =>
          deleting ? phrase.slice(0, current.length - 1) : phrase.slice(0, current.length + 1),
        );
      },
      deleting ? speed / 2 : speed,
    );

    return () => window.clearTimeout(timer);
  }, [text, deleting, index, phrases, speed, pause]);

  return text;
}

export type GitHubStats = {
  repos: number;
  followers: number;
  following: number;
  memberSince: string;
};

/**
 * Reads public profile counters from the unauthenticated GitHub API.
 * Returns null when the request fails (rate limit, offline, blocked network)
 * so the UI can fall back to a static panel rather than showing an error.
 */
export function useGitHubStats(username: string) {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;

    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setStats({
          repos: data.public_repos ?? 0,
          followers: data.followers ?? 0,
          following: data.following ?? 0,
          memberSince: data.created_at ? new Date(data.created_at).getFullYear().toString() : '—',
        });
        setState('ready');
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return { stats, state };
}

/** Counts up to `target` once the element is on screen. */
export function useCountUp(target: number, duration = 1400) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setValue(target);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          // Ease-out cubic keeps the final digits from ticking too slowly.
          setValue(Math.round(target * (1 - Math.pow(1 - progress, 3))));
          if (progress < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target, duration]);

  return { ref, value };
}
