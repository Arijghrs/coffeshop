import Reveal from './Reveal';
export default function CoffeeCard({ product, price, thumb }) {
  return (
    <Reveal className="card">
      <div className="bag">
        {thumb
          ? <img src={thumb} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 14 }} />
          : <i style={{ '--c': product.color }} />}
      </div>
      <span className="tag">{product.type}</span>
      <h3>{product.name}</h3>
      <p>{product.desc}</p>
      <div className="row"><span>{product.size} · ${price}</span><button>Order</button></div>
    </Reveal>
  );
}
