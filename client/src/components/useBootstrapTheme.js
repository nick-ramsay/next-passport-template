// app/useBootstrapTheme.js
'use client';

import { useEffect, useState } from 'react';

export function useBootstrapTheme() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const html = document.documentElement;

    const update = () => {
      setTheme(html.dataset.bsTheme || 'light');
    };

    // initial value
    update();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'data-bs-theme'
        ) {
          update();
        }
      }
    });

    observer.observe(html, {
      attributes: true,
      attributeFilter: ['data-bs-theme'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}
