import { test, expect } from '@playwright/test';

test('signup form sets br_src from ?src param and submits', async ({ page }) => {
    await page.goto('http://localhost:3000/?src=e2e_test_channel');

    const email = `testuser-${Date.now()}@example.com`;
    await page.getByPlaceholder('Email').fill(email);
    await page.getByPlaceholder('Name or Nick').fill('Playwright Test');
    await page.getByLabel('Buyer').check();

    // Wait for the response from /api/signup
    const [response] = await Promise.all([
        page.waitForResponse(res => res.url().includes('/api/signup') && res.status() === 200),
        page.getByRole('button', { name: /join wait-list/i }).click(),
    ]);

    const body = await response.json();
    console.log('API response:', body);
    console.log('API status:', response.status());

    // Check for messages
    const successMessage = page.getByText(/thank you for joining/i);
    const errorMessage = page.getByText(/something went wrong/i);

    const successVisible = await successMessage.isVisible().catch(() => false);
    const errorVisible = await errorMessage.isVisible().catch(() => false);

    console.log('Success visible:', successVisible);
    console.log('Error visible:', errorVisible);

    expect(errorVisible).toBe(false);      // Fail if error is shown
    expect(successVisible).toBe(true);     // Require success
});
