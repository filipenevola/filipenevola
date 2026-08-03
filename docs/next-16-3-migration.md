# Next.js 16.3 migration notes

This site was the first repository migrated from Next.js 16.2 to 16.3. The
changes and checks here are intended to inform later repository migrations.

## Adopted

- Upgraded `next`, `@next/third-parties`, and `eslint-config-next` to 16.3.
- Upgraded React and React DOM to the latest compatible 19.2 releases.
- Enabled Cache Components and Partial Prefetching for Instant Navigations.
- Replaced the blog's legacy route segment caching with `use cache` and
  `cacheLife`.
- Added a static blog shell with a Suspense boundary around CMS data so the
  route can navigate instantly while posts stream in.
- Opted the main blog links into `prefetch={true}` so Partial Prefetching sends
  the page shell before navigation, including when CMS data is dynamic.
- Removed `generateStaticParams` from the dynamic CMS-backed post route. Cache
  Components requires it to return at least one path during every build, which
  is not reliable when build-time CMS credentials are intentionally absent.
- Moved the Open Graph endpoint from the deprecated Edge runtime to Node.js.
- Self-hosted the Open Graph K2D fonts as TTF files. Remote WOFF loading became
  unreliable under concurrent Node.js image requests after leaving Edge.
- Removed `usePathname()` from the shared layout because identical markup was
  rendered for every page; this keeps the layout prerenderable.
- Migrated the RSS route from `dynamic`/`revalidate` segment exports to an
  explicit cached helper, with `connection()` keeping runtime-only deployment
  credentials out of prerendering.
- Added ESLint flat config because `next build` does not run lint checks.
- Added desktop and mobile Playwright coverage, including the 16.3 `instant()`
  navigation helper.
- Added `.dockerignore`; the build context fell from about 604 MB to 318 KB.

## Important lessons for the next repositories

1. Upgrade dependencies and get a clean baseline build before enabling the
   Instant Navigation flags.
2. `cacheComponents: true` rejects route segment exports such as `dynamic` and
   `revalidate`; migrate them to Suspense plus `use cache`/`cacheLife`.
3. Short-lived cached data should sit behind the smallest useful Suspense
   boundary. Keep headings and navigation outside it to produce a useful,
   testable instant shell.
4. A Suspense shell is not automatically proof of an instant navigation. Test
   with production-like dynamic data and opt important entry links into
   `prefetch={true}` when the default prefetch does not include the page shell.
5. A cached helper must have deterministic arguments and must not capture
   mutable module state. Normalize complex arguments before crossing the cache
   boundary.
6. Cache Components does not support the Edge runtime. Inventory `runtime =
   'edge'` before enabling it and verify that each route can move to Node.js.
7. `generateStaticParams()` cannot return an empty array with Cache Components.
   Remove it for fully dynamic routes or guarantee a real build-time path.
8. Test the standalone production server, not only `next dev`, because partial
   prefetching and the `instant()` helper exercise production behavior.
9. Audit production dependencies after the upgrade. This migration also moved
   `sharp` to 0.35 because the older direct dependency had a high-severity
   advisory.
10. Exercise dynamic image routes concurrently. For Node.js `ImageResponse`,
   prefer traced local TTF/OTF assets over remote WOFF downloads.
11. A cached Route Handler can still be prerendered with empty build-time data.
    Use `connection()` when its data or credentials only exist at runtime, and
    make the test fixture assert meaningful records rather than only a 200.

## Verification command

```bash
npm ci
npm test
```

`npm test` runs ESLint, a production build, and Playwright against the same
standalone Node.js server used by the Docker image, in desktop and mobile
Chromium profiles.
