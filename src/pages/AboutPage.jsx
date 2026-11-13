import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <section className="page about">
      <p className="eyebrow">About LokArt</p>
      <h1>A shop for the work you already make.</h1>
      <p className="lede">
        LokArt is a storefront for a small studio: a catalog people can browse, a bag, and a checkout that records the order. Sample ceramics and textiles are loaded so you can click through the whole path. Replace them from Studio with your own name, price, photo, and stock.
      </p>
      <div className="about-grid">
        <article>
          <h2>Selling</h2>
          <p>Open Studio, add a product, and it appears in the shop immediately. Stock drops when an order is placed.</p>
        </article>
        <article>
          <h2>Orders</h2>
          <p>Checkout does not charge a card. You get the name, phone, address, and payment choice, then mark the order packed or shipped.</p>
        </article>
        <article>
          <h2>This browser</h2>
          <p>Products, the bag, and orders live in local storage on this computer. Clearing site data removes them.</p>
        </article>
      </div>
      <Link className="btn" to="/shop">
        Enter the shop
      </Link>
    </section>
  );
}
