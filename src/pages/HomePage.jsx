import { Link } from "react-router-dom";
import { ProductCard } from "../components";
import { formatPrice, FREE_SHIPPING_OVER } from "../data";
import { useStore } from "../store";

export default function HomePage() {
  const { products } = useStore();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const shown = featured.length ? featured : products.slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Studio shop · Patan</p>
          <h1>Goods made slowly, meant to be used.</h1>
          <p>
            Ceramics, cloth, and small objects from the LokArt studio. Prices are in Nepali rupees.
            Shipping is free over {formatPrice(FREE_SHIPPING_OVER)}.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/shop">
              Shop the collection
            </Link>
            <Link className="btn ghost" to="/studio">
              Add your products
            </Link>
          </div>
        </div>
        <div className="hero-stage">
          <img
            src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1400&q=80"
            alt="Hands shaping clay on a pottery wheel"
          />
          <blockquote>
            “A mug should feel inevitable in the hand.”
            <cite>LokArt firing notes</cite>
          </blockquote>
        </div>
      </section>

      <section className="band">
        <div>
          <p className="eyebrow">This season</p>
          <h2>On the bench right now</h2>
        </div>
        <Link to="/shop">View all</Link>
      </section>

      <section className="feature-grid">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>

      <section className="story">
        <img
          src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80"
          alt="Finished ceramic vessels on a wooden shelf"
        />
        <div>
          <p className="eyebrow">The studio</p>
          <h2>A small shop you can actually run.</h2>
          <p>
            The collection starts with sample pieces so the shop is ready to browse. Open Studio to
            add your own products, edit prices, and mark orders as packed or shipped. Everything stays
            in this browser until you connect a real payment provider.
          </p>
          <Link className="btn" to="/studio">
            Open the studio
          </Link>
        </div>
      </section>
    </>
  );
}
