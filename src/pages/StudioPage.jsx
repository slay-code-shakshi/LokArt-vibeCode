import { useState } from "react";
import { CATEGORIES, formatPrice } from "../data";
import { useStore } from "../store";

const blank = {
  id: "",
  name: "",
  price: "",
  category: "Ceramics",
  stock: "1",
  image: "",
  blurb: "",
  description: "",
  details: "",
  featured: false,
};

export default function StudioPage() {
  const { products, orders, saveProduct, deleteProduct, updateOrderStatus, resetCatalog } = useStore();
  const [tab, setTab] = useState("products");
  const [draft, setDraft] = useState(blank);
  const [message, setMessage] = useState("");

  function edit(product) {
    setDraft({
      id: product.id,
      name: product.name,
      price: String(product.price),
      category: product.category,
      stock: String(product.stock),
      image: product.image || "",
      blurb: product.blurb || "",
      description: product.description || "",
      details: (product.details || []).join("\n"),
      featured: Boolean(product.featured),
    });
    setTab("products");
    setMessage(`Editing ${product.name}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSubmit(event) {
    event.preventDefault();
    const result = saveProduct(draft);
    if (!result.ok) {
      setMessage(result.message);
      return;
    }
    setMessage(`${result.product.name} is live in the shop.`);
    setDraft(blank);
  }

  function exportOrders() {
    const blob = new Blob([JSON.stringify(orders, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "lokart-orders.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="page studio">
      <header className="page-head">
        <div>
          <p className="eyebrow">Seller desk</p>
          <h1>Studio</h1>
          <p className="lede">
            Add the things you actually sell. Products and orders are stored in this browser, so use the same computer when you fulfill them.
          </p>
        </div>
        <div className="tabs">
          <button type="button" className={tab === "products" ? "chip on" : "chip"} onClick={() => setTab("products")}>
            Products ({products.length})
          </button>
          <button type="button" className={tab === "orders" ? "chip on" : "chip"} onClick={() => setTab("orders")}>
            Orders ({orders.length})
          </button>
        </div>
      </header>

      {tab === "products" ? (
        <div className="studio-grid">
          <form className="form-card" onSubmit={onSubmit}>
            <h2>{draft.id ? "Edit product" : "New product"}</h2>
            <label>
              Name
              <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} required />
            </label>
            <div className="split">
              <label>
                Price (Rs.)
                <input
                  type="number"
                  min="0"
                  value={draft.price}
                  onChange={(event) => setDraft({ ...draft, price: event.target.value })}
                  required
                />
              </label>
              <label>
                Stock
                <input
                  type="number"
                  min="0"
                  value={draft.stock}
                  onChange={(event) => setDraft({ ...draft, stock: event.target.value })}
                  required
                />
              </label>
            </div>
            <label>
              Category
              <input
                list="categories"
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              />
              <datalist id="categories">
                {CATEGORIES.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </label>
            <label>
              Image URL
              <input
                value={draft.image}
                placeholder="https://"
                onChange={(event) => setDraft({ ...draft, image: event.target.value })}
              />
            </label>
            <label>
              Short line
              <input value={draft.blurb} onChange={(event) => setDraft({ ...draft, blurb: event.target.value })} />
            </label>
            <label>
              Description
              <textarea
                rows={4}
                value={draft.description}
                onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              />
            </label>
            <label>
              Details, one per line
              <textarea rows={3} value={draft.details} onChange={(event) => setDraft({ ...draft, details: event.target.value })} />
            </label>
            <label className="radio">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
              />
              Show on the homepage
            </label>
            {message && <p className="form-note">{message}</p>}
            <div className="hero-actions">
              <button className="btn" type="submit">
                {draft.id ? "Save changes" : "Add product"}
              </button>
              {draft.id && (
                <button className="btn ghost" type="button" onClick={() => setDraft(blank)}>
                  Cancel edit
                </button>
              )}
            </div>
          </form>
          <div>
            <div className="studio-tools">
              <button
                className="text-btn"
                type="button"
                onClick={() => {
                  if (window.confirm("Replace your catalog with the original sample products?")) resetCatalog();
                }}
              >
                Restore sample catalog
              </button>
            </div>
            <ul className="studio-list">
              {products.map((product) => (
                <li key={product.id}>
                  <div>
                    <strong>{product.name}</strong>
                    <p>
                      {product.category} · {formatPrice(product.price)} · {product.stock} in stock
                    </p>
                  </div>
                  <div className="line-actions">
                    <button type="button" className="text-btn" onClick={() => edit(product)}>
                      Edit
                    </button>
                    <button type="button" className="text-btn danger" onClick={() => deleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>
          <div className="studio-tools">
            <button className="text-btn" type="button" onClick={exportOrders} disabled={orders.length === 0}>
              Download orders JSON
            </button>
          </div>
          {orders.length === 0 ? (
            <div className="empty">
              <h2>No orders yet.</h2>
              <p>When someone checks out on this browser, the order lands here.</p>
            </div>
          ) : (
            <ul className="order-list">
              {orders.map((order) => (
                <li key={order.id}>
                  <div>
                    <p className="eyebrow">{order.id}</p>
                    <h2>{order.customer.name}</h2>
                    <p>
                      {order.customer.phone} · {order.customer.city} · {order.customer.payment}
                    </p>
                    <p>{order.customer.address}</p>
                    <p className="fine">{new Date(order.createdAt).toLocaleString()}</p>
                    <ul>
                      {order.items.map((item) => (
                        <li key={`${order.id}-${item.id}`}>
                          {item.name} × {item.qty}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="order-side">
                    <strong>{formatPrice(order.totals.total)}</strong>
                    <select value={order.status} onChange={(event) => updateOrderStatus(order.id, event.target.value)}>
                      {["New", "Packed", "Shipped", "Delivered", "Cancelled"].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
