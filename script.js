// script.js — Theme toggle + mobile menu + smooth scrolling + accessible behavior

(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  // ---------- Theme (light/dark) ----------
  const THEME_KEY = 'project_theme_pref';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // Determine initial theme: saved preference > system preference > light
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  themeToggle.addEventListener('click', function () {
    const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  // ---------- Mobile menu ----------
  menuToggle.addEventListener('click', function () {
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    if (!expanded) {
      mainNav.classList.add('show');
    } else {
      mainNav.classList.remove('show');
    }
  });

  // Close mobile menu on outside click or on escape
  document.addEventListener('click', function (e) {
    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
      mainNav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      mainNav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // ---------- Smooth scroll for internal links ----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // close mobile nav after navigation
          if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
            menuToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // ---------- Reduce motion preference handling ----------
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery && mediaQuery.matches) {
    // disable animations if user prefers reduced motion
    document.querySelectorAll('.fade-in, .fade-in-delay').forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = 1;
      el.style.transform = 'none';
    });
  }

})();