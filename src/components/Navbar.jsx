import { useState } from 'react';
const LINKS = [['Our Coffee', '#collection'], ['Where to Find Us', '#find'], ['News', '#news'], ['Contact Us', '#contact']];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <a className="logo" href="#top">Benyedder</a>
      <div className={`pill${open ? ' open' : ''}`}>
        {LINKS.map(([t, h]) => <a key={h} href={h} onClick={() => setOpen(false)}>{t}</a>)}
      </div>
      <button id="burger" aria-label="Menu" onClick={() => setOpen(o => !o)}>Menu</button>
    </nav>
  );
}
