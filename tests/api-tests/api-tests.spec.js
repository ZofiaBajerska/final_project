// @ts-check
import { test, expect } from '@playwright/test';
import { GdprHelper } from '../../pages/gdpr-helper';

test('GDPR banner is accepted correctly', async ({ page }) => {
    
const gdpr = new GdprHelper(page);

  await page.goto('https://www.automationexercise.com/');

  if (await gdpr.acceptGdprButton.isVisible()) {
    await gdpr.acceptGdpr();
  }
  await expect(gdpr.acceptGdprButton).not.toBeVisible();
});

