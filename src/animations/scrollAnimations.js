export const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const sm = (a, b, x) => { const t = cl((x - a) / (b - a)); return t * t * (3 - 2 * t); };
export const lerp = (a, b, t) => a + (b - a) * t;

let items = [];
export function initTexts() {
  items = [...document.querySelectorAll('.txt')].map(el => ({ el, r: el.dataset.r.split(',').map(Number) }));
}
// Fades each story text in/out over 20% of its window (10% on phones), driven by scroll progress p.
export function updateTexts(p) {
  const desk = innerWidth > 820, f2 = desk ? 0.2 : 0.1;
  items.forEach(({ el, r }) => {
    const f = (r[1] - r[0]) * f2;
    const o = (r[0] <= 0 ? 1 : sm(r[0], r[0] + f, p)) * (1 - sm(r[1] - f, r[1], p));
    const y = (1 - o) * 24;
    el.style.opacity = o;
    el.style.transform = desk ? `translateY(calc(-50% + ${y}px))` : `translateY(${y}px)`;
    el.style.pointerEvents = o > 0.5 ? 'auto' : 'none';
  });
}
