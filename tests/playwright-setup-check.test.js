const { test, expect } = require('@playwright/test');

test('configuração básica do Playwright', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Skill5/); // ou algum termo do título real
});
