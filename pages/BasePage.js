import { expect } from '@playwright/test';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.toast = page.getByRole('alert');
    this.spinner = page.getByTestId('loader');
  }

  async goto(path = '/') {
    await this.page.goto(path);
    await this.waitForPageReady();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async expectTitle(title) {
    await expect(this.page).toHaveTitle(title);
  }

  async expectUrl(pattern) {
    await expect(this.page).toHaveURL(pattern);
  }

  async expectToast(message) {
    await expect(this.toast.filter({ hasText: message })).toBeVisible();
  }

  async confirmDialog() {
    await this.page.getByRole('button', { name: /yes, delete|confirm|yes/i }).click();
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }
}
