// app/ThemeWatcher.js
'use client';

import { useEffect } from 'react';

export default function ThemeWatcher() {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = (isDark) => {
      document.documentElement.setAttribute(
        'data-bs-theme',
        isDark ? 'dark' : 'light'
      );
    };

    // initial
    applyTheme(mq.matches);

    // respond to changes
    const listener = (event) => applyTheme(event.matches);
    mq.addEventListener('change', listener);

    return () => mq.removeEventListener('change', listener);
  }, []);

  return null;
}
