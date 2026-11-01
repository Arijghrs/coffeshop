import { useState } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CoffeeExperience from './components/CoffeeExperience';
import CoffeeCollection from './components/CoffeeCollection';
import { WhereToFindUs, News, Contact } from './components/Sections';
import Footer from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);
  const [thumbs, setThumbs] = useState(null);
  return (
    <>
      <div id="top" />
      <LoadingScreen hidden={ready} />
      <Navbar />
      <CoffeeExperience onReady={() => setReady(true)} onThumbs={setThumbs} />
      <div className="after">
        <CoffeeCollection thumbs={thumbs} />
        <WhereToFindUs />
        <News />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
