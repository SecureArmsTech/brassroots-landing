// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
    },
    webServer: {
        command: 'npm run dev',
        port: 3000,
        reuseExistingServer: false,
        timeout: 60 * 1000,
    },
});
