require('dotenv').config();
// @ts-check
import { test, expect } from '@playwright/test';
import { GdprHelper } from '../../pages/gdpr-helper.js';


test('Gdpr banner is accepted correctly', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');

  const gdpr = new GdprHelper(page);

  if (await gdpr.acceptGdprButton.isVisible()) {
    await gdpr.acceptGdpr();
  }
  await expect(gdpr.acceptGdprButton).not.toBeVisible();
});

test('Gdpr banner close and user is loggedin', async ({ page }) => {
  await page.goto('https://www.automationexercise.com/');

  const gdpr = new GdprHelper(page);
  if (await gdpr.acceptGdprButton.isVisible()) {
    await gdpr.acceptGdpr();
  }

  await expect(gdpr.acceptGdprButton).not.toBeVisible();

  await page.getByRole('listitem').filter({ hasText: 'Signup / Login' }).click();
  await expect(page.getByText('Login to your account')).toBeVisible();

  await page.locator('input[data-qa="login-email"]').fill(process.env.USER_EMAIL);
  await page.locator('input[data-qa="login-password"]').fill(process.env.USER_PASSWORD);

  await page.locator('button[data-qa="login-button"]').click();

  await expect(page.getByText(/Logged in as Zosia/)).toBeVisible();

});


