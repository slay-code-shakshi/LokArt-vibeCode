import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "../components";
import { useStore } from "../store";

export default function ShopPage() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const query = params.get("q") ?? "";
  const category = params.get("category") ?? "All";
  const [sort, setSort] = useState("featured");

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const visible = useMemo(() => {
    const term = query.trim().toLowerCase();
    let list = products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const matchesQuery =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.blurb.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term);
      return matchesCategory && matchesQuery;
    });
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "featured") list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [products, query, category, sort]);

  function setCategory(next) {
    const updated = new URLSearchParams(params);
    if (next === "All") updated.delete("category");
    else updated.set("category", next);
    setParams(updated);
  }

  return (
    <section className="page">
      <header className="page-head">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>Shop</h1>
        </div>
        <label className="sort">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="name">Name</option>
          </select>
        </label>
      </header>

      <div className="filters">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={item === category ? "chip on" : "chip"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {query && (
        <p className="result-note">
          {visible.length} result{visible.length === 1 ? "" : "s"} for “{query}”
        </p>
      )}

      {visible.length === 0 ? (
        <div className="empty">
          <h2>Nothing matches that search.</h2>
          <p>Try another word, or clear the filter and look through the full shelf.</p>
        </div>
      ) : (
        <div className="grid">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
