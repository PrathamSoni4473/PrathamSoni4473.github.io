// Lightweight carousel with prev/next, dots, and keyboard support.
(function () {
  document.querySelectorAll('.carousel').forEach((root) => {
    const track = root.querySelector('.carousel-track');
    const slides = Array.from(root.querySelectorAll('.carousel-slide'));
    const prev = root.querySelector('[data-dir="prev"]');
    const next = root.querySelector('[data-dir="next"]');
    const dotsWrap = root.querySelector('.carousel-dots');
    const counter = root.querySelector('.carousel-counter');
    const caption = root.querySelector('.carousel-caption');
    if (!track || slides.length === 0) return;

    let i = 0;

    // build dots
    if (dotsWrap) {
      slides.forEach((_, idx) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        b.addEventListener('click', () => go(idx));
        dotsWrap.appendChild(b);
      });
    }

    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = `translateX(-${i * 100}%)`;
      if (counter) counter.textContent = `${String(i + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      if (caption) {
        const cap = slides[i].getAttribute('data-caption') || '';
        caption.textContent = cap;
      }
      if (dotsWrap) {
        Array.from(dotsWrap.children).forEach((d, idx) => {
          d.classList.toggle('is-active', idx === i);
        });
      }
    }

    if (prev) prev.addEventListener('click', () => go(i - 1));
    if (next) next.addEventListener('click', () => go(i + 1));

    // Keyboard support when carousel is in view & focused area
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    });
    root.tabIndex = 0;

    go(0);
  });
})();
