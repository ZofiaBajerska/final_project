import { expect } from '@playwright/test';

class GdprHelper {
  
  constructor(page) {
    this.page = page;
    this.acceptGdprButton = page.locator('.fc-cta-consent');  
  }

  async acceptGdpr() {
    
      await this.acceptGdprButton.click();
      await expect(this.acceptGdprButton).not.toBeVisible();
    }
  }

export { GdprHelper };