import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatPrice } from "./data";
import { useStore } from "./store";

export function Layout({ children }) {
  const { cartCount, notice } = useStore();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function onSearch(event) {
    event.preventDefault();
    const term = query.trim();
    navigate(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    setOpen(false);
  }

  return (
    <div className="shell">
      <header className="header">
        <div className="header-bar">
          <button className="icon-btn menu-btn" type="button" onClick={() => setOpen((value) => !value)} aria-label="Menu">
            <span />
            <span />
          </button>
          <Link to="/" className="logo" onClick={() => setOpen(false)}>
            LokArt
          </Link>
          <nav className={`nav ${open ? "open" : ""}`}>
            <NavLink to="/shop" onClick={() => setOpen(false)}>
              Shop
            </NavLink>
            <NavLink to="/studio" onClick={() => setOpen(false)}>
              Studio
            </NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)}>
              About
            </NavLink>
          </nav>
          <form className="search" onSubmit={onSearch}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the studio"
              aria-label="Search products"
            />
          </form>
          <Link to="/cart" className="bag" aria-label="Shopping bag">
            Bag
            <em>{cartCount}</em>
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
      {notice && <div className="toast">{notice}</div>}
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <p className="logo">LokArt</p>
        <p>Objects for the table, the desk, and the days in between.</p>
      </div>
      <div>
        <p className="eyebrow">Visit</p>
        <p>Studio hours by appointment</p>
        <p>Patan, Lalitpur</p>
      </div>
      <div>
        <p className="eyebrow">Care</p>
        <Link to="/shop">All goods</Link>
        <Link to="/studio">Manage products</Link>
        <Link to="/cart">Your bag</Link>
      </div>
    </footer>
  );
}

export function ProductCard({ product }) {
  return (
    <article className="card">
      <Link to={`/product/${product.id}`} className="card-media">
        {product.image ? (
          <img src={product.image} alt={product.name} />
        ) : (
          <div className="card-fallback">{product.category}</div>
        )}
        {product.stock === 0 && <span className="sold">Sold out</span>}
      </Link>
      <div className="card-copy">
        <p className="eyebrow">{product.category}</p>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p>{product.blurb}</p>
        <strong>{formatPrice(product.price)}</strong>
      </div>
    </article>
  );
}

export function QtyControl({ qty, onChange, max }) {
  return (
    <div className="qty">
      <button type="button" onClick={() => onChange(qty - 1)} aria-label="Decrease quantity">
        −
      </button>
      <span>{qty}</span>
      <button type="button" onClick={() => onChange(Math.min(max, qty + 1))} aria-label="Increase quantity" disabled={qty >= max}>
        +
      </button>
    </div>
  );
}
