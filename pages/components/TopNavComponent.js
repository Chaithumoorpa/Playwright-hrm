import { expect } from '@playwright/test';

export class TopNavComponent {
  constructor(page) {
    this.page = page;
    this.userMenu = page.getByRole('banner').getByRole('button').or(page.getByText(/manda user|admin/i));
    this.searchBox = page.getByPlaceholder('Search');
  }

  async expectLoaded() {
    await expect(this.page.getByRole('banner')).toBeVisible();
    await expect(this.page.getByRole('navigation')).toBeVisible();
  }

  async openModule(moduleName) {
    await this.page.getByRole('link', { name: new RegExp(`^${moduleName}$`, 'i') }).click();
  }

  async logout() {
    await this.userMenu.click();
    await this.page.getByRole('menuitem', { name: /logout/i }).click();
  }
}
