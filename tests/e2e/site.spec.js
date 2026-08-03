const { expect, test } = require('@playwright/test');
const { instant } = require('@next/playwright');

test('renders the home page and newsletter entry point', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Filipe Névola/);
  await expect(
    page.getByRole('heading', { name: 'For One Person' })
  ).toBeVisible();
  await expect(page.getByAltText('Filipe Névola')).toBeVisible();

  await page.goto('/?newsletter=1');
  await expect(
    page.getByRole('heading', { name: 'Subscribe to my newsletter' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(
    page.getByRole('heading', { name: 'Subscribe to my newsletter' })
  ).toBeHidden();
});

test('keeps the blog shell instant during client navigation', async ({ page }) => {
  await page.goto('/');

  await instant(page, async () => {
    await page.getByRole('link', { name: 'Blog', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible();
    await expect(page.getByText('Thoughts on software development')).toBeVisible();
  });
});

test('streams a CMS post into the blog and opens it', async ({ page }) => {
  await page.goto('/blog');

  await page.getByRole('link', { name: 'Migration Test Post' }).click();
  await expect(
    page.getByRole('heading', { name: 'Migration Test Post' })
  ).toBeVisible();
  await expect(page.getByText('deterministic test article')).toBeVisible();
});

test('serves RSS and Open Graph image endpoints', async ({ request }) => {
  const rss = await request.get('/rss.xml');
  expect(rss.ok()).toBeTruthy();
  expect(rss.headers()['content-type']).toContain('application/rss+xml');
  const rssText = await rss.text();
  expect(rssText).toContain('<rss version="2.0"');
  expect(rssText).toContain('<item>');
  expect(rssText).toContain('Migration Test Post');

  const og = await request.get('/api/og?title=Migration%20test');
  expect(og.ok()).toBeTruthy();
  expect(og.headers()['content-type']).toContain('image/png');
  expect((await og.body()).byteLength).toBeGreaterThan(10_000);
});
