# Performance & Optimization Report: Aurora Dawn SMP Website

This report outlines key areas where the website can be optimized for faster load times, reduced bandwidth consumption, and a better overall user experience.

---

## 📊 Current State Analysis

Based on a performance audit of the current codebase and production build:

*   **Total JS Bundle Size**: **~1.1 MB** (Single chunk: `index.js`).
*   **Total Static Assets weight**: **~2.0 MB+** (Mainly hero images and a massive favicon).
*   **Largest Individual Assets**:
    *   `news-hero.png`: **813 KB**
    *   `favicon.png`: **493 KB** (Critical: Favicons should be < 16 KB)
    *   `rules_newphoto.webp`: **550 KB**
    *   `three.js` (Library): Roughly **500-600 KB** of the bundled JS.

---

## 🛠️ Optimization Strategy

### 1. 🖼️ Asset & Image Optimization
Images are currently the largest contributors to page weight.
*   **Convert to Modern Formats**: Use **WebP** or **AVIF** for all images. `news-hero.png` could be reduced from 813KB to ~80KB without losing visible quality.
*   **Favicon Fix**: The current `favicon.png` is **493 KB**. This is downloaded every time a user visits the site. It should be converted to a compressed `.ico` or small `.png` (typically 32x32px or 64x64px), bringing it down to **< 10 KB**.
*   **Lazy Loading**: Ensure all images have `loading="lazy"` attributes to prevent loading images that are "below the fold" until the user scrolls to them.

### 2. 📦 Code Splitting & Dependency Management
The entire application (including the Admin Dashboard and 3D rendering code) is currently bundled into a single file.
*   **Route-Based Lazy Loading**: Use `React.lazy` and `Suspense` for page routes. The `AdminDashboard` should only load when a user visits `/admin`, saving ~120KB for regular players.
*   **Three.js Lazy Loading**: 3D elements are heavy. If the 3D scene is only in the hero section, load `three.js` dynamically only when that component mounts.
*   **Icon Library Tree-Shaking**: Ensure you are only importing the specific icons used (e.g., `import { FaUser } from "react-icons/fa"`) rather than the entire library.
*   **Animation Library Consolidation**: The project currently uses both `framer-motion` and `gsap`. Consolidating to one (likely Framer Motion for React) would save ~165KB of bundle size.

### 3. 🌐 Bandwidth & Delivery
*   **HTTP/2 & Brotli**: Ensure the hosting provider (e.g., Vercel, Netlify) uses **Brotli compression**, which is ~20% more efficient than Gzip.
*   **Cache Headers**: Implement aggressive caching for static assets (images, fonts, scripts) with long expiry dates using `Cache-Control: max-age=31536000`.

### 4. ⚡ User Experience (UX) & Interactions
*   **Splash Screen / Skeleton Loaders**: Instead of a blank screen while the 1.1MB JS bundle downloads, use a lightweight "Aurora" splash screen or skeleton components.
*   **Interaction Feedback**: The "Copy IP" button should have a clear "Copied!" animation or toast notification to confirm user action.
*   **Font Optimization**: Use `font-display: swap` for Google Fonts to ensure text is visible immediately.

### 5. 🔍 "And Shit" (SEO, Accessibility, & Maintenance)
*   **SEO Metadata**: Add OpenGraph (`og:image`, `og:title`) and Twitter card tags so the site looks great when shared on Discord or Social Media.
*   **Accessibility (a11y)**: Ensure all interactive elements have `aria-label` attributes and maintain a contrast ratio of at least 4.5:1 for readability.
*   **Build Optimization**: Use `vite-plugin-image-optimizer` to automatically compress assets during the build process.

---

## 🚀 Recommended Immediate Actions

1.  **Optimize Favicon**: Resize and compress `favicon.png` immediately (it's currently nearly 0.5MB!).
2.  **Convert Hero Images**: Reprocess `news-hero.png` and `aurora-hero-v3.jpg` into optimized WebP.
3.  **Implement Route Lazy Loading**: Update `App.jsx` to use `React.lazy` for all routes.
4.  **Consolidate Libraries**: Decide between `framer-motion` and `gsap` to shave off ~160KB.

---

> [!TIP]
> Reducing the homepage weight from ~3MB to < 500KB will significantly improve your **SEO rankings** and user retention, especially for players visiting from Discord on mobile devices.
