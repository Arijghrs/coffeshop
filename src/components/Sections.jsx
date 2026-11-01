import { useState } from 'react';
import Reveal from './Reveal';

const Cards = ({ tag, title, text, items }) => (
  <div className="grid">
    {items.map((t, i) => (
      <Reveal className="card" key={i}>
        <span className="tag">{tag[i]}</span><h3>{title(t)}</h3><p>{text}</p>
      </Reveal>
    ))}
  </div>
);

export function WhereToFindUs() {
  return (
    <section id="find" className="alt">
      <span className="eyebrow">Where to Find Us</span>
      <h2>Find a cup <em>near you</em></h2>
      <Cards tag={['Placeholder', 'Placeholder', 'Placeholder']} title={t => `Location ${t}`} text="Address to be announced." items={['one', 'two', 'three']} />
    </section>
  );
}

export function News() {
  return (
    <section id="news">
      <span className="eyebrow">News</span>
      <h2>From the <em>roastery</em></h2>
      <Cards tag={['Update', 'Journal', 'Guide']} title={() => 'Headline placeholder'} text="News article summary will appear here." items={[1, 2, 3]} />
    </section>
  );
}

export function Contact() {
  const [msg, setMsg] = useState('');
  const submit = e => { e.preventDefault(); setMsg('Thank you. This demo form does not send data.'); e.target.reset(); };
  return (
    <section id="contact" className="alt two">
      <div>
        <span className="eyebrow">Contact Us</span>
        <h2>Let’s talk <em>coffee</em></h2>
        <p>Email: hello@your-domain.example<br />Phone: +000 00 000 000<br />Instagram · Facebook · TikTok<br /><small>Placeholder details.</small></p>
      </div>
      <form onSubmit={submit}>
        <input required placeholder="Your name" />
        <input required type="email" placeholder="Email" />
        <textarea required rows="4" placeholder="Message" />
        <button className="btn" style={{ margin: 0 }}>Send message</button>
        <p className="note" role="status">{msg}</p>
      </form>
    </section>
  );
}
