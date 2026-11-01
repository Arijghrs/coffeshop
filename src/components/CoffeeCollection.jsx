import { PRODUCTS } from '../data/products';
import CoffeeCard from './CoffeeCard';
// thumbs: frames captured from the 3D journey (bean, grind, pour, cup)
export default function CoffeeCollection({ thumbs }) {
  return (
    <section id="collection">
      <span className="eyebrow">Our Coffee</span>
      <h2>Discover the taste of <em>Benyedder</em></h2>
      <div className="grid">
        {PRODUCTS.map((p, i) => <CoffeeCard key={p.name} product={p} price={12 + i * 2} thumb={thumbs && thumbs[i]} />)}
      </div>
      <p className="note">Sample products and prices. Final range to be provided.</p>
    </section>
  );
}
