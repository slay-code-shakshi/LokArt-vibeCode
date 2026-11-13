export const CURRENCY = "NPR";

export const SHIPPING_FLAT = 250;
export const FREE_SHIPPING_OVER = 5000;
export const VAT_RATE = 0.13;

export const CATEGORIES = ["Ceramics", "Textiles", "Paper", "Home", "Jewelry"];

export const seedProducts = [
  {
    id: "river-mug",
    name: "River Stoneware Mug",
    price: 1450,
    category: "Ceramics",
    featured: true,
    stock: 18,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=1200&q=80",
    blurb: "Speckled clay, a thumb rest, and a glaze the color of wet stone.",
    description:
      "Thrown on the wheel in small batches. The mug holds 300ml, sits steady on a desk, and keeps tea warm longer than a thin porcelain cup. Each one varies slightly in speckle and rim.",
    details: ["Stoneware, food safe", "Holds 300ml", "Dishwasher safe", "Made in small batches"],
  },
  {
    id: "ash-vase",
    name: "Ash Glaze Vase",
    price: 4200,
    category: "Ceramics",
    featured: true,
    stock: 7,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=1200&q=80",
    blurb: "A tall bottle form with a quiet, cloudy glaze.",
    description:
      "Built for a single branch or a handful of dried stems. The ash glaze breaks over the shoulder, so no two vases read the same in daylight.",
    details: ["Height about 28cm", "Watertight", "Wipe clean", "One of a small firing"],
  },
  {
    id: "linen-runner",
    name: "Handloom Linen Runner",
    price: 2800,
    category: "Textiles",
    featured: true,
    stock: 11,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    blurb: "Undyed linen with a loose, visible weave.",
    description:
      "A table runner that looks better after it has been washed. The edges are hemmed by hand. It softens and creases in a way that suits everyday meals.",
    details: ["40 × 180cm", "100% linen", "Machine wash cold", "Natural undyed"],
  },
  {
    id: "cedar-candle",
    name: "Cedar & Smoke Candle",
    price: 980,
    category: "Home",
    featured: false,
    stock: 24,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=80",
    blurb: "Soy wax poured into a reusable amber glass.",
    description:
      "Cedar, a little smoke, and dried orange peel. Burns about 40 hours. When the wax is gone, the glass works as a tumbler.",
    details: ["220g soy wax", "Cotton wick", "About 40 hour burn", "Reusable glass"],
  },
  {
    id: "wool-throw",
    name: "Hill Wool Throw",
    price: 6400,
    category: "Textiles",
    featured: true,
    stock: 6,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?auto=format&fit=crop&w=1200&q=80",
    blurb: "A heavy throw in moss, cream, and charcoal stripes.",
    description:
      "Woven from wool that still has a bit of spring. Wide enough for a sofa, heavy enough for a cold evening. The stripe rhythm is slightly irregular on purpose.",
    details: ["130 × 180cm", "Wool blend", "Dry clean or gentle hand wash", "Fringed ends"],
  },
  {
    id: "field-journal",
    name: "Field Notes Journal",
    price: 1650,
    category: "Paper",
    featured: false,
    stock: 20,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    blurb: "Thick cotton paper, a cloth cover, a lay-flat binding.",
    description:
      "192 pages of off-white paper that takes ink without feathering. The cover is book cloth in a deep clay red. A ribbon marks the page you actually meant to keep.",
    details: ["A5", "192 pages", "Lay-flat binding", "Ribbon marker"],
  },
  {
    id: "botanical-print",
    name: "Botanical Study Print",
    price: 2200,
    category: "Paper",
    featured: false,
    stock: 15,
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1200&q=80",
    blurb: "A limited ink print of pressed fern and seed pods.",
    description:
      "Printed on warm cotton rag paper. The edition is small and numbered in pencil along the lower edge. Ships flat, unframed.",
    details: ["30 × 40cm", "Cotton rag paper", "Unframed", "Numbered edition"],
  },
  {
    id: "brass-chain",
    name: "Brass Seed Necklace",
    price: 4500,
    category: "Jewelry",
    featured: true,
    stock: 9,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    blurb: "A small cast pendant on a fine brass chain.",
    description:
      "The pendant is the size of a cardamom pod. It sits just below the collarbone. Brass will darken with wear; a soft cloth brings the shine back.",
    details: ["45cm chain", "Cast brass", "Lobster clasp", "Comes in a cloth pouch"],
  },
  {
    id: "clay-planter",
    name: "Terracotta Planter",
    price: 1850,
    category: "Home",
    featured: false,
    stock: 14,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80",
    blurb: "Unglazed clay with a drainage hole and a matching saucer.",
    description:
      "A straightforward planter for herbs or a small fern. The clay breathes, so soil dries more evenly than in plastic. Saucer included.",
    details: ["Diameter 16cm", "Drainage hole", "Saucer included", "Unglazed terracotta"],
  },
  {
    id: "silk-scarf",
    name: "Indigo Silk Scarf",
    price: 3600,
    category: "Textiles",
    featured: false,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1200&q=80",
    blurb: "A light scarf dipped in uneven indigo.",
    description:
      "The dye pools at the edges and fades toward the center. Wear it at the neck or tie it to a bag. It packs flat and does not need ironing to look right.",
    details: ["55 × 160cm", "Silk blend", "Hand dyed", "Cool wash"],
  },
  {
    id: "oak-board",
    name: "Oak Serving Board",
    price: 3200,
    category: "Home",
    featured: false,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=1200&q=80",
    blurb: "A long board with a juice groove and a leather tie.",
    description:
      "Cut from a single oak plank, sanded smooth, and finished with food-safe oil. The handle has a hole for a leather hanging tie.",
    details: ["18 × 55cm", "Solid oak", "Food-safe oil", "Hand wash"],
  },
  {
    id: "enamel-pin",
    name: "Studio Enamel Pin",
    price: 650,
    category: "Jewelry",
    featured: false,
    stock: 40,
    image:
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1200&q=80",
    blurb: "A small clay-red pin with a polished brass edge.",
    description:
      "The LokArt mark, reduced to a circle and a single stroke. Hard enamel, two clutches on the back so it stays put on a jacket.",
    details: ["22mm", "Hard enamel", "Brass metal", "Double clutch"],
  },
];

export function formatPrice(amount) {
  const rounded = Math.round(amount);
  return `Rs. ${rounded.toLocaleString("en-NP")}`;
}

export function shippingFor(subtotal) {
  return subtotal >= FREE_SHIPPING_OVER || subtotal === 0 ? 0 : SHIPPING_FLAT;
}

export function orderTotals(subtotal) {
  const shipping = shippingFor(subtotal);
  const vat = Math.round((subtotal + shipping) * VAT_RATE);
  return { subtotal, shipping, vat, total: subtotal + shipping + vat };
}

export function slugify(value) {
  const base = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  return `${base || "product"}-${Math.random().toString(36).slice(2, 6)}`;
}
