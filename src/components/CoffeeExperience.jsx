import { useEffect, useRef } from 'react';
import { createCoffeeScene } from '../scenes/CoffeeScene';
import { initTexts, updateTexts } from '../animations/scrollAnimations';
import ScrollText from './ScrollText';

export default function CoffeeExperience({ onReady, onThumbs }) {
  const ref = useRef(null);
  useEffect(() => {
    initTexts();
    const dispose = createCoffeeScene(ref.current, {
      onProgress: updateTexts,
      onReady,
      onThumbs,
      onFail: () => { document.body.classList.add('nogl'); onReady(); },
    });
    updateTexts(0);
    return () => dispose && dispose();
  }, []);
  return (
    <>
      <div id="stage"><canvas id="cv" ref={ref} /></div>
      <div id="track"><ScrollText /></div>
    </>
  );
}
