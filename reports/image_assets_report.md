# Aurora SMP Website - Image Assets Report

This report provides a comprehensive list of all image assets found within the project, their storage locations, and their usage in the source code.

## 1. Project-wide Image Inventory

### Public Directory (`/public`)
These assets are served at the root path in the built application.

| Filename | Path | Description |
| :--- | :--- | :--- |
| `favicon.png` | `/favicon.png` | Site favicon |
| `rules_newphoto.webp` | `/rules_newphoto.webp` | Background image for the Rules page |
| `lore-bg.png` | `/images/lore-bg.png` | Background image for the Lore page |

### Source Assets (`/src/assets`)
These assets are imported directly into React components.

| Filename | Path | Usage |
| :--- | :--- | :--- |
| `aurora-hero-v3.jpg` | `src/assets/aurora-hero-v3.jpg` | Main hero backdrop image |
| `news-hero.png` | `src/assets/news-hero.png` | Banner for the Announcements/News page |

### Stock Photos Directory (`/public/aurora_stock_photos`)
A collection of Minecraft screenshots and community photos used throughout the site.

| Filename | Path | Primary Usage |
| :--- | :--- | :--- |
| `2024-09-17_19.jpg` | `/aurora_stock_photos/2024-09-17_19.jpg` | Feature Grid |
| `2024-10-08_03.jpg` | `/aurora_stock_photos/2024-10-08_03.jpg` | Join Page / Feature Grid |
| `Peaceful-Vanilla-Club-3.jpg` | `/aurora_stock_photos/Peaceful-Vanilla-Club-3.jpg` | Feature Grid / Two Column Features |
| `Peaceful-Vanilla-Club-4.jpg` | `/aurora_stock_photos/Peaceful-Vanilla-Club-4.jpg` | Feature Grid / Two Column Features |
| `Screenshot_2026-01-29_212051.png` | `/aurora_stock_photos/Screenshot_2026-01-29_212051.png` | Two Column Features |
| `minecraft-1618089_1920.jpg` | `/aurora_stock_photos/minecraft-1618089_1920.jpg` | Two Column Features |

---

## 2. Source Code References

The following table maps components to the specific images they reference.

| Component | Referenced Image Path | Logic Location |
| :--- | :--- | :--- |
| `HeroBackdrop.jsx` | `../assets/aurora-hero-v3.jpg` | Import as `heroBg` |
| `AnnouncementsPage.jsx`| `../assets/news-hero.png` | Import as `newsHero` |
| `RulesPage.jsx` | `/rules_newphoto.webp` | Defined in `RulesBg` constant |
| `LorePage.jsx` | `/images/lore-bg.png` | Direct `src` attribute |
| `JoinPage.jsx` | `/aurora_stock_photos/2024-10-08_03.jpg` | Direct `src` attribute |
| `FeatureGrid.jsx` | Various stock photos | Data array for grid items |
| `TwoColumnFeatures.jsx`| Various stock photos | Props passed to `FeatureRow` |
| `siteContent.json` | `/src/assets/news-hero.png` | JSON metadata |

---

## 3. Unused or Duplicate Assets

During the audit, the following observations were made:
- **Duplicate Directory:** There are two similarly named directories: `public/aurora_stock_photos` and `public/aurora_stock photos` (with a space). The codebase primarily references the one WITHOUT the space.
- **Unused Assets:** Many files in `public/aurora_stock photos` (with space) like `hero-bg.jpg`, `hero-bg.png`, and `feature-3.png` do not appear to be directly referenced by filename in the current `src` directory.

> [!TIP]
> Consider consolidating the stock photo directories to avoid confusion and reduce project size.
