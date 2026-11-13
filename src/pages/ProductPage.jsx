import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ProductCard, QtyControl } from "../components";
import { formatPrice } from "../data";
import { useStore } from "../store";

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart } = useStore();
  const product = products.find((entry) => entry.id === id);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="page empty">
        <h1>That piece is no longer in the studio.</h1>
        <Link className="btn" to="/shop">
          Back to the shop
        </Link>
      </section>
    );
  }

  const related = products.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 3);

  return (
    <section className="page">
      <p className="crumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        {product.category}
      </p>
      <div className="product">
        <div className="product-media">
          {product.image ? <img src={product.image} alt={product.name} /> : <div className="card-fallback">{product.category}</div>}
        </div>
        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <p className="lede">{product.description || product.blurb}</p>
          {product.details?.length > 0 && (
            <ul className="details">
              {product.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          )}
          <p className="stock">{product.stock > 0 ? `${product.stock} in the studio` : "Sold out"}</p>
          <div className="buy-row">
            <QtyControl qty={qty} max={Math.max(product.stock, 1)} onChange={(next) => setQty(Math.max(1, next))} />
            <button className="btn" type="button" disabled={product.stock === 0} onClick={() => addToCart(product.id, qty)}>
              Add to bag
            </button>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <div className="related">
          <h2>Also in {product.category}</h2>
          <div className="grid">
            {related.map((entry) => (
              <ProductCard key={entry.id} product={entry} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
