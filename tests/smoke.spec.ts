import { test, expect } from '@playwright/test';

const BASE = process.env.SITE_URL || 'http://localhost:3000';

test('home loads', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveTitle(/DOJMARK/i);
});

test('portal redirects unauth', async ({ page, context }) => {
  await context.clearCookies();                 // ensure unauth
  await page.goto(`${BASE}/portal`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL(/\/login(\?|$)/i, { timeout: 10_000 }); // wait server redirect
  await expect(page).toHaveURL(/\/login(\?|$)/i);
});

test('health ok', async ({ request }) => {
  const res = await request.get(`${BASE}/api/health`);
  expect(res.status()).toBe(200);
  const data = await res.json();
  expect(data.ok).toBe(true);
  expect(data.time).toBeDefined();
});

test('services page loads', async ({ page }) => {
  await page.goto(`${BASE}/services`, { waitUntil: 'domcontentloaded' });
  await expect(page).toHaveTitle(/DOJMARK/i);
});

test('contact form accessible', async ({ page }) => {
  await page.goto(`${BASE}/contact`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('form')).toBeVisible({ timeout: 10_000 });
});

test('quote form accessible', async ({ page }) => {
  await page.goto(`${BASE}/quote`, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('form')).toBeVisible({ timeout: 10_000 });
});
