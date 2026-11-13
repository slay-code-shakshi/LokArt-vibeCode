import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { orderTotals, seedProducts, slugify } from "./data";

const StoreContext = createContext(null);
const PRODUCT_KEY = "lokart-products";
const CART_KEY = "lokart-cart";
const ORDER_KEY = "lokart-orders";

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => readStorage(PRODUCT_KEY, seedProducts));
  const [cart, setCart] = useState(() => readStorage(CART_KEY, []));
  const [orders, setOrders] = useState(() => readStorage(ORDER_KEY, []));
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    localStorage.setItem(PRODUCT_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDER_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), 2400);
    return () => clearTimeout(timer);
  }, [notice]);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartLines = cart
    .map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return null;
      return { ...item, product, lineTotal: product.price * item.qty };
    })
    .filter(Boolean);

  const subtotal = cartLines.reduce((sum, line) => sum + line.lineTotal, 0);
  const totals = orderTotals(subtotal);

  function addToCart(productId, qty = 1) {
    const product = products.find((entry) => entry.id === productId);
    if (!product) return;
    setCart((current) => {
      const existing = current.find((item) => item.id === productId);
      const nextQty = (existing?.qty ?? 0) + qty;
      const capped = Math.min(nextQty, product.stock);
      if (existing) {
        return current.map((item) => (item.id === productId ? { ...item, qty: capped } : item));
      }
      return [...current, { id: productId, qty: Math.min(qty, product.stock) }];
    });
    setNotice(`${product.name} added to bag`);
  }

  function setQty(productId, qty) {
    const product = products.find((entry) => entry.id === productId);
    if (!product) return;
    setCart((current) => {
      if (qty <= 0) return current.filter((item) => item.id !== productId);
      const capped = Math.min(qty, product.stock);
      return current.map((item) => (item.id === productId ? { ...item, qty: capped } : item));
    });
  }

  function removeFromCart(productId) {
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function placeOrder(customer) {
    const id = `LA-${Date.now().toString(36).toUpperCase()}`;
    const order = {
      id,
      createdAt: new Date().toISOString(),
      customer,
      items: cartLines.map((line) => ({
        id: line.product.id,
        name: line.product.name,
        price: line.product.price,
        qty: line.qty,
      })),
      totals,
      status: "New",
    };
    setOrders((current) => [order, ...current]);
    setProducts((current) =>
      current.map((product) => {
        const line = cartLines.find((entry) => entry.product.id === product.id);
        if (!line) return product;
        return { ...product, stock: Math.max(0, product.stock - line.qty) };
      }),
    );
    setCart([]);
    return order;
  }

  function saveProduct(draft) {
    const price = Number(draft.price);
    const stock = Number(draft.stock);
    if (!draft.name.trim() || !Number.isFinite(price) || price < 0) {
      return { ok: false, message: "Name and a valid price are required." };
    }
    const next = {
      id: draft.id || slugify(draft.name),
      name: draft.name.trim(),
      price: Math.round(price),
      category: draft.category.trim() || "Home",
      featured: Boolean(draft.featured),
      stock: Number.isFinite(stock) ? Math.max(0, Math.round(stock)) : 0,
      image: draft.image.trim(),
      blurb: draft.blurb.trim() || draft.description.trim().slice(0, 90),
      description: draft.description.trim(),
      details: draft.details
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    };
    setProducts((current) => {
      const exists = current.some((product) => product.id === next.id);
      if (exists) return current.map((product) => (product.id === next.id ? next : product));
      return [next, ...current];
    });
    return { ok: true, product: next };
  }

  function deleteProduct(productId) {
    setProducts((current) => current.filter((product) => product.id !== productId));
    setCart((current) => current.filter((item) => item.id !== productId));
  }

  function updateOrderStatus(orderId, status) {
    setOrders((current) =>
      current.map((order) => (order.id === orderId ? { ...order, status } : order)),
    );
  }

  function resetCatalog() {
    setProducts(seedProducts);
    setNotice("Catalog restored to the sample studio goods");
  }

  const value = useMemo(
    () => ({
      products,
      cart,
      cartLines,
      cartCount,
      totals,
      orders,
      notice,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      placeOrder,
      saveProduct,
      deleteProduct,
      updateOrderStatus,
      resetCatalog,
    }),
    [products, cart, cartLines, cartCount, totals, orders, notice],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}
