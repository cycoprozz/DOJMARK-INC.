import { test, expect } from '@playwright/test';

const BASE = process.env.SITE_URL || 'http://localhost:3000';

test('home loads', async ({ page }) => {
  await page.goto(BASE);
  await expect(page).toHaveTitle(/DOJMARK/i);
});

test('portal redirects unauth', async ({ page }) => {
  await page.goto(`${BASE}/portal`);
  // Portal should redirect to login when not authenticated
  await expect(page).toHaveURL(/\/login/i);
});

test('services page loads', async ({ page }) => {
  await page.goto(`${BASE}/services`);
  await expect(page).toHaveTitle(/DOJMARK/i);
});

test('contact form accessible', async ({ page }) => {
  await page.goto(`${BASE}/contact`);
  await expect(page.locator('form')).toBeVisible();
});

test('quote form accessible', async ({ page }) => {
  await page.goto(`${BASE}/quote`);
  await expect(page.locator('form')).toBeVisible();
});
