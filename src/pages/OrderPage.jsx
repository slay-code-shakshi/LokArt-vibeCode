import { Link, useParams } from "react-router-dom";
import { formatPrice } from "../data";
import { useStore } from "../store";

export default function OrderPage() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((entry) => entry.id === id);

  if (!order) {
    return (
      <section className="page empty">
        <h1>We could not find that order.</h1>
        <Link className="btn" to="/shop">
          Return to the shop
        </Link>
      </section>
    );
  }

  return (
    <section className="page order">
      <p className="eyebrow">Order received</p>
      <h1>Thank you, {order.customer.name.split(" ")[0]}.</h1>
      <p className="lede">
        Order <strong>{order.id}</strong> is saved in Studio. Payment method: {order.customer.payment}. Nothing was charged automatically.
      </p>
      <div className="order-card">
        <p>
          {order.customer.address}, {order.customer.city}
        </p>
        <p>{order.customer.phone}</p>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              <span>
                {item.name} × {item.qty}
              </span>
              <span>{formatPrice(item.price * item.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="sum strong">
          <span>Total</span>
          <span>{formatPrice(order.totals.total)}</span>
        </p>
      </div>
      <div className="hero-actions">
        <Link className="btn" to="/studio">
          View in Studio
        </Link>
        <Link className="btn ghost" to="/shop">
          Keep browsing
        </Link>
      </div>
    </section>
  );
}
