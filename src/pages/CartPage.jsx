import { Link } from "react-router-dom";
import { QtyControl } from "../components";
import { formatPrice, FREE_SHIPPING_OVER } from "../data";
import { useStore } from "../store";

export default function CartPage() {
  const { cartLines, totals, setQty, removeFromCart } = useStore();

  if (cartLines.length === 0) {
    return (
      <section className="page empty">
        <p className="eyebrow">Bag</p>
        <h1>Your bag is empty.</h1>
        <p>The shelf is stocked whenever you are.</p>
        <Link className="btn" to="/shop">
          Browse the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="page cart-page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Bag</p>
          <h1>Ready to check out</h1>
        </div>
      </header>
      <div className="cart-layout">
        <ul className="lines">
          {cartLines.map((line) => (
            <li key={line.id}>
              <Link to={`/product/${line.product.id}`} className="line-media">
                {line.product.image ? <img src={line.product.image} alt="" /> : <div className="card-fallback" />}
              </Link>
              <div>
                <h2>
                  <Link to={`/product/${line.product.id}`}>{line.product.name}</Link>
                </h2>
                <p>{formatPrice(line.product.price)}</p>
                <div className="line-actions">
                  <QtyControl qty={line.qty} max={line.product.stock} onChange={(qty) => setQty(line.id, qty)} />
                  <button type="button" className="text-btn" onClick={() => removeFromCart(line.id)}>
                    Remove
                  </button>
                </div>
              </div>
              <strong>{formatPrice(line.lineTotal)}</strong>
            </li>
          ))}
        </ul>
        <aside className="summary">
          <h2>Summary</h2>
          <Row label="Subtotal" value={formatPrice(totals.subtotal)} />
          <Row label="Shipping" value={totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)} />
          <Row label="VAT 13%" value={formatPrice(totals.vat)} />
          <Row label="Total" value={formatPrice(totals.total)} strong />
          <p className="fine">
            {totals.shipping === 0
              ? "You have free shipping on this order."
              : `Free shipping on orders over ${formatPrice(FREE_SHIPPING_OVER)}.`}
          </p>
          <Link className="btn" to="/checkout">
            Checkout
          </Link>
        </aside>
      </div>
    </section>
  );
}

function Row({ label, value, strong }) {
  return (
    <p className={strong ? "sum strong" : "sum"}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}
