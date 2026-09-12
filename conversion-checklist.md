# Conversion checklist

| Source | Web destination | Status | Notes |
| --- | --- | --- | --- |
| Front cover (page 1) | `index.html` | visually checked | Cover artwork cropped from the supplied wrap PDF; crop marks, spine, filename, and timestamp excluded. |
| Book pages 2–11 | `pg002_sec001.html`–`pg011_sec001.html` | visually checked | Semantic HTML compared with the source PDF at desktop and mobile widths; Rehema/sign-language IDs retained. |
| Book pages 12–51 | `pg012_sec001.html`–`pg051_sec001.html` | visually checked | Semantic HTML compared with the source PDF using page contact sheets and browser renders; desktop/mobile overflow checks, navigation, exercises, Rehema audio IDs, and sign-language media verified. |
| Book pages 52–101 | `pg052_sec001.html`–`pg101_sec001.html` | visually checked | Semantic HTML and clean illustration assets; source order, tables, exercises, XL text flow, Rehema/sign-language identifiers, desktop/mobile overflow, and navigation checked against the PDF and live viewer. |
| Book pages 102–153 | `pg102_sec001.html`–`pg153_sec001.html` | visually checked | Semantic HTML and clean illustration assets compared with the source PDF; source order, activities, answer lines, XL text flow, Rehema/sign-language identifiers, navigation, and watermark removal verified in the live viewer. A full 152-page rendered-text audit confirmed source content coverage. |
| Back cover (page 154) | `back-cover.html` | visually checked | Cover artwork cropped from the supplied wrap PDF; crop marks, spine, filename, and timestamp excluded. |
