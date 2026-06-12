---
name: Tailwind v3 to v4 Migration
overview: A comprehensive guide for migrating from Tailwind CSS v3 to v4, including visual regression testing with screenshots, breaking changes reference, and step-by-step migration process applicable to any project.
todos:
  - id: backup-screenshots
    content: Take baseline screenshots of all pages before migration using Cursor browser tools
    status: pending
  - id: run-upgrade-tool
    content: Run `npx @tailwindcss/upgrade` on a new branch
    status: pending
  - id: fix-globals-css
    content: Migrate @layer components styles in globals.css to @utility or native CSS
    status: pending
  - id: verify-renamed-utilities
    content: Search codebase for renamed utilities (shadow, rounded, ring, outline-none, blur) and update if upgrade tool missed any
    status: pending
  - id: check-border-colors
    content: Audit all border utilities and add explicit colors where default gray-200 was expected
    status: pending
  - id: post-migration-screenshots
    content: Take comparison screenshots after migration
    status: pending
  - id: visual-diff-review
    content: Compare before/after screenshots and fix any visual regressions
    status: pending
  - id: full-testing
    content: Test all pages, hover states, responsive breakpoints, and forms
    status: pending
isProject: false
---

# Tailwind CSS v3 to v4 Migration Guide

## Official Resources

- **Upgrade Guide**: https://tailwindcss.com/docs/upgrade-guide
- **v4.0 Announcement**: https://tailwindcss.com/blog/tailwindcss-v4
- **v4.1 Release Notes**: https://tailwindcss.com/blog/tailwindcss-v4-1
- **Functions and Directives**: https://tailwindcss.com/docs/functions-and-directives
- **GitHub Releases**: https://github.com/tailwindlabs/tailwindcss/releases/tag/v4.0.0
- **GitHub Discussions**: https://github.com/tailwindlabs/tailwindcss/discussions (for troubleshooting)

---

## Prerequisites

### Browser Support in v4

Tailwind v4 targets modern browsers:

- Safari 16.4+
- Chrome 111+
- Firefox 128+

### Node.js Requirement

- Node.js 20 or higher is required for the upgrade tool

---

## Phase 1: Visual Baseline (Screenshots Before Migration)

Before making any changes, capture screenshots of all pages to compare after migration.

### Using Cursor's Browser MCP Tools

1. **Start your dev server** and ensure the app is running locally

2. **Navigate and screenshot each page**:

   - Use `browser_navigate` to open each page
   - Use `browser_take_screenshot` with `fullPage: true` for complete page captures
   - Save with descriptive filenames

3. **Screenshot naming convention**:

   - `before-{page-name}.png` (e.g., `before-home.png`, `before-blog.png`)
   - `after-{page-name}.png` (after migration)

4. **Workflow example**:
   ```
   Navigate to http://localhost:3000 -> screenshot as "before-home.png"
   Navigate to http://localhost:3000/blog -> screenshot as "before-blog.png"
   Repeat for each unique page/route
   ```

5. **For responsive testing**, use `browser_resize` to test at different viewport widths:

   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

---

## Phase 2: Pre-Migration Preparation

### Step 1: Create a new branch

```bash
git checkout -b tailwind-v4-migration
```

### Step 2: Audit current configuration

Review your existing setup to understand what will be migrated:

**`tailwind.config.js`** - Note any customizations:

- Custom colors, fonts, spacing
- Extended theme values
- Plugins being used
- Content paths

**`postcss.config.js`** - Note plugins:

- `postcss-import` (will be removed - now built-in)
- `autoprefixer` (will be removed - now built-in)

**`globals.css`** - Note custom styles:

- `@layer` usage
- `@apply` usage
- Custom utilities

---

## Phase 3: Run the Automatic Upgrade Tool

```bash
npx @tailwindcss/upgrade
```

The tool will:

1. Update dependencies in `package.json`
2. Migrate `tailwind.config.js` to CSS-based configuration
3. Update `postcss.config.js`
4. Transform template files (rename utilities, update syntax)
5. Convert `globals.css` to new format

### What the upgrade tool changes

**Package changes:**

- `tailwindcss` upgraded to v4.x
- Adds `@tailwindcss/postcss` (PostCSS plugin)
- Removes `autoprefixer` (now built-in)
- Removes `postcss-import` (now built-in)

**Configuration migration:**

```css
/* Before: tailwind.config.js */
module.exports = {
  content: ["./app/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}

/* After: globals.css */
@import "tailwindcss";
/* Content detection is automatic */
/* Theme customizations use @theme */
```

**CSS file transformation:**

```css
/* Before */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After */
@import "tailwindcss";
```

---

## Phase 4: Manual Fixes After Upgrade

### 4.1 PostCSS Configuration

Ensure `postcss.config.mjs` looks like:

```javascript
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### 4.2 Migrating @layer to @utility

`@layer components` and `@layer utilities` need migration to `@utility`:

```css
/* Before */
@layer components {
  .btn {
    @apply px-4 py-2 rounded;
  }
}

/* After */
@utility btn {
  @apply px-4 py-2 rounded-sm;
}
```

For component-level styles with nested selectors (like `.blog-content h1`, `.blog-content p`), keep them as regular CSS rules without `@layer`:

```css
/* Before */
@layer components {
  .blog-content h1 {
    @apply text-3xl font-bold;
  }
}

/* After - use plain CSS with @apply */
.blog-content h1 {
  @apply text-3xl font-bold;
}
```

### 4.3 Renamed Utilities Reference

The upgrade tool handles most of these, but verify:

| v3 | v4 |

|---|---|

| `shadow-xs` | `shadow-2xs` |

| `shadow-sm` | `shadow-xs` |

| `drop-shadow-xs` | `drop-shadow-xs` |

| `drop-shadow-sm` | `drop-shadow-xs` |

| `blur-xs` | `blur-xs` |

| `blur-sm` | `blur-xs` |

| `rounded-xs` | `rounded-xs` |

| `rounded-sm` | `rounded-xs` |

| `outline-hidden` | `outline-hidden` |

| `ring-3` | `ring-3` |

### 4.4 Removed Deprecated Utilities

Replace these patterns:

- `bg-opacity-*` -> `bg-black/50` (opacity modifier)
- `text-opacity-*` -> `text-black/50`
- `border-opacity-*` -> `border-black/50`
- `flex-shrink-*` -> `shrink-*`
- `flex-grow-*` -> `grow-*`
- `text-ellipsis` -> `text-ellipsis`

### 4.5 Important Modifier Change

```html
<!-- Before -->
<div class="bg-red-500!">

<!-- After (preferred in v4) -->
<div class="bg-red-500!">
```

The old syntax still works but is deprecated.

### 4.6 Default Border/Ring Color Change

Borders now use `currentColor` instead of `gray-200`. Add explicit colors where needed:

```html
<!-- Add explicit color if you depended on default gray border -->
<div class="border border-gray-200">
```

### 4.7 CSS Variable Syntax Change

```html
<!-- Before -->
<div class="bg-(--brand-color)">

<!-- After -->
<div class="bg-(--brand-color)">
```

---

## Phase 5: Theme Customization in CSS

If you had custom theme values in `tailwind.config.js`, migrate them to `@theme` in your CSS:

```css
@import "tailwindcss";

@theme {
  /* Custom colors */
  --color-brand: #3b82f6;
  --color-brand-dark: #1d4ed8;
  
  /* Custom fonts */
  --font-display: "Inter", sans-serif;
  
  /* Custom breakpoints */
  --breakpoint-3xl: 120rem;
  
  /* Custom shadows */
  --shadow-soft: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

To reset defaults and customize entirely:

```css
@theme {
  --color-*: initial;  /* Clear all default colors */
  --color-primary: #...;
  --color-secondary: #...;
}
```

---

## Phase 6: Post-Migration Screenshots

1. Start your dev server: `npm run dev`
2. Take screenshots of each page using the same Cursor browser workflow as Phase 1
3. Save with `after-` prefix (e.g., `after-home.png`, `after-blog.png`)

### Comparing Screenshots

1. Open before/after images side by side in any image viewer or VS Code
2. Check for visual differences in:

   - Spacing and margins
   - Colors and borders
   - Shadows and rounded corners
   - Focus/ring states
   - Hover states

Any differences indicate areas that need manual adjustment.

---

## Phase 7: Testing Checklist

- [ ] All pages render without console errors
- [ ] No missing styles or broken layouts
- [ ] Hover states work correctly
- [ ] Responsive breakpoints function properly
- [ ] Dark mode (if used) works correctly
- [ ] Forms and buttons have correct cursor behavior
- [ ] Borders appear as expected (may need explicit colors now)
- [ ] Ring utilities appear as expected (check focus states)
- [ ] Custom utilities still work
- [ ] Animations/transitions work properly

---

## Phase 8: Common Issues and Solutions

### Issue: "Cannot apply unknown utility class"

**Cause**: Custom classes defined in `@layer` can't be used with `@apply` in v4

**Solution**: Convert to `@utility` directive or use plain CSS

### Issue: Borders appear different

**Cause**: Default border color changed from `gray-200` to `currentColor`

**Solution**: Add explicit color classes: `border-gray-200`

### Issue: Ring looks different

**Cause**: Default ring width changed from 3px to 1px

**Solution**: Use `ring-3` instead of `ring-3`

### Issue: Buttons have default cursor instead of pointer

**Cause**: Preflight change in v4

**Solution**: Add to your CSS:

```css
@layer base {
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
}
```

### Issue: `theme()` function errors in media queries

**Cause**: Syntax changed to use CSS variable names

**Solution**:

```css
/* Before */
@media (width >= theme(screens.xl)) { }
/* After */
@media (width >= theme(--breakpoint-xl)) { }
```

### Issue: Hover states on mobile

**Cause**: v4 wraps hover in `@media (hover: hover)` for better mobile behavior

**Solution**: If you need old behavior for tap-to-hover:

```css
@custom-variant hover (&:hover);
```

### Issue: Gradients reset in variants

**Cause**: v4 preserves gradient values across variants instead of resetting

**Solution**: Use `via-none` to explicitly unset a three-stop gradient:

```html
<div class="bg-linear-to-r from-red-500 via-orange-400 to-yellow-400 dark:via-none dark:from-blue-500 dark:to-teal-400">
```

---

## Version Reference

- **Tailwind CSS v4.0**: Released January 22, 2025
- **Tailwind CSS v4.1**: Released April 3, 2025 (adds text shadows, masks, pointer variants)
- **Current Latest**: v4.1.x (check https://tailwindcss.com for latest)

---

## Project-Specific Notes for filipenevola

Your current setup:

- **Tailwind**: v3.4.15
- **PostCSS**: v8.4.49
- **Autoprefixer**: v10.4.20 (will be removed)
- **Next.js**: v16.1.4

Files to migrate:

- [`tailwind.config.js`](tailwind.config.js) - Simple config with no customizations, straightforward migration
- [`postcss.config.js`](postcss.config.js) - Remove autoprefixer, use @tailwindcss/postcss
- [`app/globals.css`](app/globals.css) - Has `@layer components` with `.blog-content` nested styles

The `.blog-content` styles use nested selectors (`.blog-content h1`, `.blog-content p`, etc.). After migration, these should be converted to plain CSS rules with `@apply` (without `@layer`):

```css
@import "tailwindcss";

/* Blog content styles - plain CSS with @apply */
.blog-content {
  @apply text-neutral-300;
}

.blog-content h1 {
  @apply pt-6 text-3xl leading-9 font-medium text-white;
}

/* ... rest of nested selectors ... */
```