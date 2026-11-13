# LokArt

A small studio shop for selling products from the browser: catalog, bag, checkout, and a Studio desk for managing what you sell.

## Run it

```bash
npm install
npm run dev
```

Open the local URL Vite prints (usually http://localhost:5173).

## What you can do

- Browse the shop, search, and filter by category.
- Add pieces to the bag and check out. Prices are in NPR, with 13% VAT and free shipping over Rs. 5,000.
- Checkout does not charge a card. The order is saved on this computer.
- Open **Studio** to add, edit, or delete products, and to mark orders as packed, shipped, or delivered.
- Download orders as JSON from the Studio orders tab.

Products, the bag, and orders are stored in this browser’s local storage. Clearing site data removes them.

The shop starts with sample ceramics, textiles, and objects so the pages are usable immediately. Use **Restore sample catalog** in Studio if you want those pieces back after editing.
