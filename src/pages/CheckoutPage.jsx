import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { formatPrice } from "../data";
import { useStore } from "../store";

const emptyCustomer = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "Kathmandu",
  note: "",
  payment: "Cash on delivery",
};

export default function CheckoutPage() {
  const { cartLines, totals, placeOrder } = useStore();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  if (cartLines.length === 0) return <Navigate to="/cart" replace />;

  function update(field, value) {
    setCustomer((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!customer.name.trim() || !customer.email.trim() || !customer.address.trim() || !customer.phone.trim()) {
      setError("Name, email, phone, and address are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      setError("Enter a valid email so the studio can send the receipt.");
      return;
    }
    const order = placeOrder(customer);
    navigate(`/order/${order.id}`);
  }

  return (
    <section className="page checkout">
      <header className="page-head">
        <div>
          <p className="eyebrow">Checkout</p>
          <h1>Where should this go?</h1>
          <p className="lede">
            This is a local checkout. No card is charged. The order is saved on this device so you can fulfill it from Studio.
          </p>
        </div>
      </header>
      <form className="checkout-grid" onSubmit={submit}>
        <div className="form-card">
          <label>
            Full name
            <input value={customer.name} onChange={(event) => update("name", event.target.value)} required />
          </label>
          <div className="split">
            <label>
              Email
              <input type="email" value={customer.email} onChange={(event) => update("email", event.target.value)} required />
            </label>
            <label>
              Phone
              <input value={customer.phone} onChange={(event) => update("phone", event.target.value)} required />
            </label>
          </div>
          <label>
            Address
            <input value={customer.address} onChange={(event) => update("address", event.target.value)} required />
          </label>
          <label>
            City
            <input value={customer.city} onChange={(event) => update("city", event.target.value)} required />
          </label>
          <label>
            Note for the studio
            <textarea value={customer.note} onChange={(event) => update("note", event.target.value)} rows={3} />
          </label>
          <fieldset>
            <legend>Payment</legend>
            {["Cash on delivery", "Bank transfer", "eSewa / Khalti (manual)"].map((method) => (
              <label key={method} className="radio">
                <input
                  type="radio"
                  name="payment"
                  checked={customer.payment === method}
                  onChange={() => update("payment", method)}
                />
                {method}
              </label>
            ))}
          </fieldset>
          {error && <p className="form-error">{error}</p>}
          <button className="btn" type="submit">
            Place order · {formatPrice(totals.total)}
          </button>
        </div>
        <aside className="summary">
          <h2>Your order</h2>
          <ul className="mini-lines">
            {cartLines.map((line) => (
              <li key={line.id}>
                <span>
                  {line.product.name} × {line.qty}
                </span>
                <span>{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p className="sum">
            <span>Shipping</span>
            <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
          </p>
          <p className="sum">
            <span>VAT 13%</span>
            <span>{formatPrice(totals.vat)}</span>
          </p>
          <p className="sum strong">
            <span>Total</span>
            <span>{formatPrice(totals.total)}</span>
          </p>
          <Link to="/cart">Edit bag</Link>
        </aside>
      </form>
    </section>
  );
}
