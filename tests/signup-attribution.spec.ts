import { test, expect } from '@playwright/test';

test('signup form sets br_src from ?src param and submits', async ({ page }) => {
    const testSrc = 'e2e_test_channel';
    const testEmail = 'e2e-test@example.com';
    const testName = 'TestUser';

    await page.goto(`http://localhost:3000/?src=${testSrc}`);
    await page.waitForTimeout(1000);

    const localStorageDebug = await page.evaluate(() => ({
        keys: Object.keys(localStorage),
        br_src: localStorage.getItem('br_src'),
    }));
    console.log('LocalStorage debug:', localStorageDebug);
    expect(localStorageDebug.br_src).toBe(testSrc);

    // Fill in form fields
    await page.fill('input[type="email"]', testEmail);
    await page.fill('input[type="text"]', testName); // updated selector
    await page.check('input[type="radio"][value="buyer"]');
    await page.click('button[type="submit"]');

    const successMessage = page.locator('text=/thank you for joining/i');
    await expect(successMessage).toBeVisible({ timeout: 5000 });
});
