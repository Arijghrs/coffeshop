const STEPS = [
  { r: '0,.15', eb: 'Benyedder Coffee', h: <>Every great coffee starts with a single <em>bean.</em></>, p: 'Scroll to follow the journey, from the first bean to the last drop.', d: '18 g · 1:16', cta: ['Discover our coffee', '#collection'] },
  { r: '.2,.31', eb: 'Inside the machine', h: <>Open up the <em>craft.</em></>, p: 'The casing slides away to reveal the burrs, gears and chute that do the quiet work.', d: '64 mm burrs' },
  { r: '.34,.52', eb: 'The grind', h: <>Carefully selected. <em>Perfectly ground.</em></>, p: 'Whole beans are crushed to an even, fine powder that releases every note of flavor.', d: '400 µm · 12 s' },
  { r: '.55,.68', eb: 'The extraction', h: <>Where precision meets <em>perfection.</em></>, p: 'Hot water blooms the grounds slowly. The art of a perfect extraction takes patience.', d: '92°C · 280 g' },
  { r: '.72,1.01', eb: 'The cup', h: <>Every drop tells a <em>story.</em></>, p: 'Rich, fresh and unhurried. Discover the taste of Benyedder.', d: '3:29 · 1 cup', cta: ['Explore our collection', '#collection'] },
];
export default function ScrollText() {
  return STEPS.map(s => (
    <div className="txt" data-r={s.r} key={s.r}>
      <span className="eyebrow">{s.eb}</span>
      <h2>{s.h}</h2>
      <p>{s.p}</p>
      <p className="data">{s.d}</p>
      {s.cta && <a className="btn" href={s.cta[1]}>{s.cta[0]}</a>}
    </div>
  ));
}
