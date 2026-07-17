# Hoa Sen Home price source — recipe

Discovered 17/07/2026. hoasenhome.vn is a Magento (Adobe Commerce) PWA storefront
with a **public, anonymous GraphQL API** — no browser automation needed.

## The daily job

```
node scripts/fetch-hoasen.mjs
```

- Endpoint: `GET https://hoasenhome.vn/graphql?query=<urlencoded GraphQL>`
- Category: `category_uid = "Mw=="` (base64 `"3"`) = the "Tôn Hoa Sen" category
  behind https://hoasenhome.vn/ton-hoa-sen (85 products as of 17/07/2026)
- Price field: `price_range.minimum_price.final_price.value` (VND, đ/m)
- Output: `src/data/hoa-sen-reference.ts` — per-family summary (min/max/variant
  count), rendered as the "Giá tham khảo thị trường" block on `/ton-hoa-sen/`
- Exit 0 = OK (file rewritten only if prices actually changed — the date line
  is excluded from the comparison, so an unchanged market day = no git diff)
- Exit 1 = fetch or sanity failure → **file untouched, do not commit/publish**

## Sanity rails (inside the script)

Abort without writing when: fewer than 3 families or 20 items parsed, more than
¼ of item names match no known family, or any price outside 20.000–300.000 đ/m.
These fire when Hoa Sen Home changes their catalog structure — a human should
re-check the API (see below) and update `FAMILIES`/bounds in the script.

## Notes

- Prices are the **anonymous default-region listed prices** (giá niêm yết).
  The site shows small logged-in/promo discounts (~1%) that the anonymous API
  does not include — fine for a labeled reference table.
- These are Hoa Sen Home's retail prices, published on `/ton-hoa-sen/` with
  attribution as market reference ONLY. The daily job must never modify
  `src/data/prices.ts` (Hà Lan's own selling prices — owner-maintained).
- Re-discovery if the API changes: open https://hoasenhome.vn/ton-hoa-sen in
  the browser, watch network requests for `graphql?query=...GetCategories`,
  and read the current query/category uid from there.
