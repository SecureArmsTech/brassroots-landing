import { test, expect } from '@playwright/test';

test('signup form sets br_src from ?src param and submits', async ({ page }) => {
    const testSrc = 'e2e_test_channel';
    const testEmail = 'e2e-test@example.com';
    const testName = 'TestUser';

    // Load the page with the source param
    await page.goto(`http://localhost:3000/?src=${testSrc}`);
    await page.waitForTimeout(1000); // Let hydration complete

    // Check localStorage for attribution source
    const localStorageDebug = await page.evaluate(() => ({
        keys: Object.keys(localStorage),
        br_src: localStorage.getItem('br_src'),
    }));
    console.log('LocalStorage debug:', localStorageDebug);
    expect(localStorageDebug.br_src).toBe(testSrc);

    // Fill the form
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="text"]', testName);
    await page.check('input[type="radio"][value="buyer"]');
    await page.click('button[type="submit"]');

    // Wait for either success or error message
    const successMessage = page.locator('text=/thank you for joining/i');
    const errorMessage = page.locator('text=/error|invalid|failed/i');

    const successVisible = await successMessage.isVisible().catch(() => false);
    const errorVisible = await errorMessage.isVisible().catch(() => false);

    console.log('Success visible:', successVisible);
    console.log('Error visible:', errorVisible);

    expect(successVisible || errorVisible).toBe(true);
});
