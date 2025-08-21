// src/components/ScrollToTop.jsx

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let start = null;
    const duration = 400; // Adjust for speed: 300–500ms feels natural
    const initialY = window.scrollY;

    if (initialY === 0) return;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percent = Math.min(progress / duration, 1);

      window.scrollTo(0, initialY * (1 - easeInOutCubic(percent)));

      if (percent < 1) {
        requestAnimationFrame(step);
      }
    };

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    requestAnimationFrame(step);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
