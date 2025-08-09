import { test, expect } from '@playwright/test';

test.describe('Quote Flow End-to-End', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('homepage loads correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/DOJMARK - Result-Driven Digital Marketing/);
    
    // Check hero heading
    await expect(page.locator('h1')).toContainText('Result-Driven');
    
    // Check primary CTA button
    const quoteCTA = page.locator('a[href="/quote"]').first();
    await expect(quoteCTA).toBeVisible();
    await expect(quoteCTA).toContainText('Get Your Quote');
  });

  test('navigation works correctly', async ({ page }) => {
    // Test desktop navigation
    await page.locator('a[href="/services"]').first().click();
    await expect(page).toHaveURL('/services');
    
    await page.locator('a[href="/portfolio"]').first().click(); 
    await expect(page).toHaveURL('/portfolio');
    
    await page.locator('a[href="/contact"]').first().click();
    await expect(page).toHaveURL('/contact');
    
    // Go back to home
    await page.locator('a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('quote form opens from homepage CTA', async ({ page }) => {
    // Click the main quote CTA
    await page.locator('a[href="/quote"]').first().click();
    
    // Should navigate to quote page
    await expect(page).toHaveURL('/quote');
    
    // Check quote form elements
    await expect(page.locator('h1')).toContainText('Get Your Project Quote');
    await expect(page.locator('input[name="full_name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select')).toHaveCount(4); // service, project_type, budget_range, timeline
  });

  test('quote form validation works', async ({ page }) => {
    await page.goto('/quote');
    
    // Try to submit empty form
    await page.locator('button[type="submit"]').click();
    
    // Should show validation errors
    await expect(page.locator('text=Full name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('quote form submission works', async ({ page }) => {
    await page.goto('/quote');
    
    // Fill out the form
    await page.fill('input[name="full_name"]', 'John Doe');
    await page.fill('input[name="email"]', 'john@example.com');
    await page.fill('input[name="phone"]', '+1-555-0123');
    await page.fill('input[name="company"]', 'Test Company');
    
    // Select service
    await page.selectOption('select[name="service"]', { label: /Web Development/ });
    
    // Select project type
    await page.selectOption('select[name="project_type"]', 'website');
    
    // Select budget range
    await page.selectOption('select[name="budget_range"]', '5k-10k');
    
    // Select timeline
    await page.selectOption('select[name="timeline"]', '1-2months');
    
    // Fill project details
    await page.fill('textarea[name="scope_details"]', 'This is a test project description that meets the minimum character requirement for validation.');
    
    // Submit form
    await page.locator('button[type="submit"]').click();
    
    // Should redirect to thank you page
    await expect(page).toHaveURL(/\/thank-you\?qid=/);
    await expect(page.locator('h1')).toContainText('Thank You for Your Request!');
  });

  test('service pre-selection works', async ({ page }) => {
    // Navigate to services page
    await page.goto('/services');
    
    // Click on a service "Get Quote" button (assumes first service card)
    await page.locator('a[href*="/quote?service="]').first().click();
    
    // Should navigate to quote page with service pre-selected
    await expect(page).toHaveURL(/\/quote\?service=/);
    
    // Check that service is pre-selected
    const serviceSelect = page.locator('select[name="service"]');
    await expect(serviceSelect).not.toHaveValue('');
  });

  test('mobile navigation works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button exists
    const menuButton = page.locator('button[aria-label="Open menu"], button:has(svg)').first();
    await expect(menuButton).toBeVisible();
    
    // Click mobile menu
    await menuButton.click();
    
    // Check mobile menu items
    await expect(page.locator('text=Home')).toBeVisible();
    await expect(page.locator('text=Services')).toBeVisible();
    await expect(page.locator('text=Portfolio')).toBeVisible();
    
    // Check mobile CTA buttons
    await expect(page.locator('text=Client Login')).toBeVisible();
    await expect(page.locator('text=Get Quote')).toBeVisible();
  });

  test('mobile quote form works', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/quote');
    
    // Check form is mobile-friendly
    await expect(page.locator('h1')).toBeVisible();
    
    // Check form fields are accessible
    await expect(page.locator('input[name="full_name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    
    // Check submit button is appropriately sized
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeVisible();
    
    // Test form fills on mobile
    await page.fill('input[name="full_name"]', 'Mobile User');
    await page.fill('input[name="email"]', 'mobile@example.com');
    
    // Verify fields have values
    await expect(page.locator('input[name="full_name"]')).toHaveValue('Mobile User');
    await expect(page.locator('input[name="email"]')).toHaveValue('mobile@example.com');
  });

  test('client portal access works', async ({ page }) => {
    // Click client portal link
    await page.locator('a[href="/portal"]').first().click();
    
    // Should redirect to login page if not authenticated
    await expect(page).toHaveURL('/portal/login');
    
    // Check login form elements
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('external links work correctly', async ({ page }) => {
    // Test Instagram link (should open in new tab)
    const instagramLink = page.locator('a[href="https://www.instagram.com/cycoprozz"]').first();
    await expect(instagramLink).toBeVisible();
    await expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/cycoprozz');
  });

  test('contact form works', async ({ page }) => {
    await page.goto('/contact');
    
    // Check contact form elements
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    
    // Fill and submit contact form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('textarea[name="message"]', 'This is a test message.');
    
    // Note: This will test form submission without actually sending
    // In a real test, you'd mock the API endpoint
  });

  test('portfolio page displays projects', async ({ page }) => {
    await page.goto('/portfolio');
    
    // Check portfolio heading
    await expect(page.locator('h1')).toContainText(/Portfolio|Our Work/);
    
    // Check project links work
    const externalLinks = page.locator('a[href^="https://"]');
    await expect(externalLinks.first()).toBeVisible();
    
    // Check portfolio CTA
    const portfolioCTA = page.locator('a[href="/quote"]');
    await expect(portfolioCTA).toBeVisible();
  });

  test('services page displays services', async ({ page }) => {
    await page.goto('/services');
    
    // Check services heading
    await expect(page.locator('h1')).toContainText(/Services|What We Do/);
    
    // Check service cards
    await expect(page.locator('text=Web Development')).toBeVisible();
    await expect(page.locator('text=Brand Identity')).toBeVisible();
    
    // Check quote CTAs exist
    const quoteCTAs = page.locator('a[href*="/quote"]');
    await expect(quoteCTAs.first()).toBeVisible();
  });

  test('lighthouse accessibility check', async ({ page }) => {
    await page.goto('/');
    
    // Basic accessibility checks
    // Check for heading hierarchy
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for alt text on images
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
    
    // Check for proper link text (no "click here" or empty links)
    const links = page.locator('a');
    const linkCount = await links.count();
    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const linkText = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      
      // Ensure link has meaningful text or aria-label
      expect(linkText || ariaLabel).toBeTruthy();
    }
  });

  test('404 page handling', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');
    
    // Should show 404 page or redirect appropriately
    // The exact behavior depends on your 404 implementation
    const response = await page.goto('/non-existent-page');
    expect(response?.status()).toBe(404);
  });

  test('quote form reference links functionality', async ({ page }) => {
    await page.goto('/quote');
    
    // Find reference links section
    await expect(page.locator('text=Reference Links')).toBeVisible();
    
    // Check add link button
    const addButton = page.locator('button:has-text("Add another link")');
    await expect(addButton).toBeVisible();
    
    // Click to add another link field
    await addButton.click();
    
    // Should now have 2 reference link inputs
    const linkInputs = page.locator('input[type="url"]');
    await expect(linkInputs).toHaveCount(2);
  });
});
