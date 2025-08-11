import { test, expect } from '@playwright/test';

const BASE_URL = process.env.SITE_URL || 'http://localhost:3000';

test.describe('Analytics API', () => {
  test('POST /api/analytics should return 201 for valid event', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/analytics`, {
      data: {
        event_type: 'page_view',
        event_data: { page: '/test' },
        user_agent: 'Mozilla/5.0 (Test Browser)',
        ip_address: '127.0.0.1',
        referrer: 'https://example.com'
      }
    });

    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Analytics event tracked successfully');
  });

  test('POST /api/analytics should return 400 for missing event_type', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/analytics`, {
      data: {
        event_data: { page: '/test' },
        user_agent: 'Mozilla/5.0 (Test Browser)',
        ip_address: '127.0.0.1'
      }
    });

    expect(response.status()).toBe(400);
    
    const data = await response.json();
    expect(data).toHaveProperty('error');
    expect(data.error).toBe('Event type is required');
  });

  test('POST /api/analytics should work with minimal data', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/analytics`, {
      data: {
        event_type: 'test_event'
      }
    });

    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Analytics event tracked successfully');
  });

  test('POST /api/analytics should handle demo mode gracefully', async ({ request }) => {
    // This test should pass even without Supabase configured
    const response = await request.post(`${BASE_URL}/api/analytics`, {
      data: {
        event_type: 'demo_test',
        event_data: { test: true }
      }
    });

    expect(response.status()).toBe(201);
    
    const data = await response.json();
    expect(data).toHaveProperty('message');
    expect(data.message).toContain('Analytics event tracked successfully');
  });
});
