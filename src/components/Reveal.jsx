import { useEffect, useRef, useState } from 'react';
export default function Reveal({ className = '', children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setOn(true), { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`${className} rv${on ? ' in' : ''}`}>{children}</div>;
}
