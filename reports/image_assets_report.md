# Aurora SMP Website - Image Assets Report

This report provides a comprehensive list of all image assets found within the project, their storage locations, and their usage in the source code.

## 1. Project-wide Image Inventory

### Centralized Assets Directory (`/public/aurora_stock_photos`)
All project image assets have been consolidated into this single directory for simplified management and better performance.

| Filename | Path | Category | Primary Usage | Size |
| :--- | :--- | :--- | :--- | :--- |
| `favicon.png` | `/aurora_stock_photos/favicon.png` | UI | Site favicon (Browser tab) | 386 KB |
| `og-image.png` | `/aurora_stock_photos/og-image.png` | Metadata | OpenGraph / Social Preview | 929 KB |
| `rules_newphoto.webp` | `/aurora_stock_photos/rules_newphoto.webp` | Backdrop | Rules Page background | 550 KB |
| `lore-bg.png` | `/aurora_stock_photos/lore-bg.png` | Backdrop | Lore Page background | 922 KB |
| `aurora-hero-v3.jpg` | `/aurora_stock_photos/aurora-hero-v3.jpg` | Backdrop | Main Hero backdrop | 103 KB |
| `news-hero.png` | `/aurora_stock_photos/news-hero.png` | Banner | Announcements Page header | 814 KB |
| `2024-09-17_19.webp` | `/aurora_stock_photos/2024-09-17_19.webp` | Screenshot | Feature Grid | 209 KB |
| `2024-10-08_03.webp` | `/aurora_stock_photos/2024-10-08_03.webp` | Screenshot | Join Page / Feature Grid | 202 KB |
| `Peaceful-Vanilla-Club-3.webp` | `/aurora_stock_photos/Peaceful-Vanilla-Club-3.webp` | Screenshot | Feature Grid / Two Column Features | 146 KB |
| `Peaceful-Vanilla-Club-4.webp` | `/aurora_stock_photos/Peaceful-Vanilla-Club-4.webp` | Screenshot | Feature Grid / Two Column Features | 165 KB |
| `Screenshot_2026-01-29_212051.webp` | `/aurora_stock_photos/Screenshot_2026-01-29_212051.webp` | Screenshot | Two Column Features | 34 KB |
| `minecraft-1618089_1920.webp` | `/aurora_stock_photos/minecraft-1618089_1920.webp` | Screenshot | Two Column Features | 653 KB |

---

## 2. Source Code References

The following table maps components to the specific images they reference.

| Component | Referenced Image Path | Reference Type | Performance Strategy |
| :--- | :--- | :--- | :--- |
| `HeroBackdrop.jsx` | `/aurora_stock_photos/aurora-hero-v3.jpg` | Constant | Priority Load |
| `AnnouncementsPage.jsx`| `/aurora_stock_photos/news-hero.png` | Constant | Priority Load |
| `RulesPage.jsx` | `/aurora_stock_photos/rules_newphoto.webp` | Constant | **Lazy Loaded** |
| `LorePage.jsx` | `/aurora_stock_photos/lore-bg.png` | Meta | **Lazy Loaded** |
| `index.html` | `/aurora_stock_photos/favicon.png` | Favicon link | Browser Cache |
| `JoinPage.jsx` | `/aurora_stock_photos/2024-10-08_03.webp` | Direct `src` | **Lazy Loaded** |
| `siteContent.json` | `/aurora_stock_photos/news-hero.png` | JSON Path | Default |
| `FeatureGrid.jsx` | Various stock photos | Card data | **Lazy Loaded** |
| `TwoColumnFeatures.jsx`| Various stock photos | Feature grid | **Lazy Loaded** |

---

## 3. Directory Audit Notes

- [x] **Consolidation**: All images moved from `public/images/`, `public/`, and `src/assets/` to `public/aurora_stock_photos/`.
- [x] **Optimization**: All non-hero images now use `loading="lazy"`.
- [x] **Metadata**: Professional `og-image.png` generated and implemented.
- [x] **Cleanup**: All massive or redundant `.webp` icons have been removed.

> [!TIP]
> All future image assets should be placed in the `/public/aurora_stock_photos/` directory and referenced using an absolute path starting with `/aurora_stock_photos/`.
