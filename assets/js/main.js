/* Programa EIXO Comercial — interações de UI (progressive enhancement) */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.querySelector('.nav-toggle');
  var navMenu = document.getElementById('navMenu');
  var navPill = document.querySelector('.nav-pill');
  var progressBar = document.querySelector('.scroll-progress');
  var topBtn = document.querySelector('.top-btn');

  /* ---- Header scroll state + progress bar ---- */
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (header) header.classList.toggle('is-scrolled', y > 8);
    if (topBtn) topBtn.classList.toggle('is-visible', y > 600);
    if (progressBar) {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      progressBar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (topBtn) {
    topBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile nav ---- */
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      var open = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!open));
      navMenu.classList.toggle('is-open', !open);
      document.body.style.overflow = !open ? 'hidden' : '';
    });
    navMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Sliding pill indicator under active nav link ---- */
  function positionPill() {
    if (!navPill || !navMenu) return;
    if (window.innerWidth <= 1220) { navPill.classList.remove('is-ready'); return; }
    var active = navMenu.querySelector('a.is-active');
    if (!active) { navPill.classList.remove('is-ready'); return; }
    navPill.style.width = active.offsetWidth + 'px';
    navPill.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    navPill.classList.add('is-ready');
  }
  window.addEventListener('resize', positionPill);
  window.addEventListener('load', positionPill);
  positionPill();

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll('[data-count-to]');
  function animateCount(el) {
    var to = parseFloat(el.getAttribute('data-count-to'));
    var decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals'), 10) : 0;
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var val = to * eased;
      el.textContent = decimals ? val.toFixed(decimals) : Math.round(val);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = decimals ? to.toFixed(decimals) : to;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var ioCount = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          ioCount.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { ioCount.observe(el); });
  }

  /* ---- Accessible tabs (Pilares, Método) ---- */
  document.querySelectorAll('[data-tabs]').forEach(function (group) {
    var tabs = Array.prototype.slice.call(group.querySelectorAll('[role="tab"]'));
    var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });

    function select(index, moveFocus) {
      tabs.forEach(function (t, i) {
        var isActive = i === index;
        t.setAttribute('aria-selected', String(isActive));
        t.setAttribute('tabindex', isActive ? '0' : '-1');
        if (panels[i]) panels[i].hidden = !isActive;
        if (isActive && moveFocus) t.focus();
      });
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(i, false); });
      tab.addEventListener('keydown', function (e) {
        var newIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') newIndex = (i + 1) % tabs.length;
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') newIndex = (i - 1 + tabs.length) % tabs.length;
        if (e.key === 'Home') newIndex = 0;
        if (e.key === 'End') newIndex = tabs.length - 1;
        if (newIndex !== null) { e.preventDefault(); select(newIndex, true); }
      });
    });

    /* Progressive enhancement: everything is visible in markup for crawlers;
       once JS runs we switch to a real tabbed interface starting at tab 0. */
    group.querySelectorAll('.tablist[hidden]').forEach(function (tl) { tl.hidden = false; });
    select(0, false);
  });

  /* ---- Smooth-height native <details> accordion ---- */
  document.querySelectorAll('.accordion-item').forEach(function (item) {
    var body = item.querySelector('.accordion-body');
    var summary = item.querySelector('summary');
    if (!body || !summary) return;

    summary.addEventListener('click', function (e) {
      if (!item.open) return; // will open naturally; nothing to animate on open-start
    });

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = item.open;
      if (isOpen) {
        collapse();
      } else {
        item.querySelectorAll('.accordion-item[open]');
        expand();
      }
    });

    function expand() {
      item.open = true;
      var h = body.scrollHeight;
      body.style.overflow = 'hidden';
      body.style.height = '0px';
      requestAnimationFrame(function () {
        body.style.transition = 'height .35s ease';
        body.style.height = h + 'px';
      });
      body.addEventListener('transitionend', function te() {
        body.style.height = '';
        body.style.overflow = '';
        body.style.transition = '';
        body.removeEventListener('transitionend', te);
      });
    }

    function collapse() {
      var h = body.scrollHeight;
      body.style.overflow = 'hidden';
      body.style.height = h + 'px';
      requestAnimationFrame(function () {
        body.style.transition = 'height .3s ease';
        body.style.height = '0px';
      });
      body.addEventListener('transitionend', function te() {
        item.open = false;
        body.style.height = '';
        body.style.overflow = '';
        body.style.transition = '';
        body.removeEventListener('transitionend', te);
      });
    }
  });

  /* ---- Magnetic glow on primary buttons ---- */
  document.querySelectorAll('.btn-primary').forEach(function (btn) {
    btn.addEventListener('pointermove', function (e) {
      var r = btn.getBoundingClientRect();
      btn.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
      btn.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
    });
  });

  /* ---- Current year in footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
