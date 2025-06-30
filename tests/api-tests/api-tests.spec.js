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

test('API test GET All Products List', async ({ request }) => {
  const allProductList = await request.get('https://automationexercise.com/api/productsList');

  expect(allProductList.status()).toBe(200);
  expect(await allProductList.text()).toContain('Blue Top');
});

test('API test POST to Search Product', async ({ request }) => {
  const response = await request.post('https://automationexercise.com/api/searchProduct',{
    form:{
      search_product : 'Top'
    }
  });

  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(data).toHaveProperty('products');
  expect(data.products.length).toBeGreaterThan(0);
});




