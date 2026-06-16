import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';
import { TopNavComponent } from './components/TopNavComponent.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.topNav = new TopNavComponent(page);
    this.heading = page.getByRole('heading', { name: /dashboard/i });
  }

  async expectLoaded() {
    await expect(this.heading).toBeVisible();
    await this.topNav.expectLoaded();
  }

  async openEmployees() {
    await this.topNav.openModule('PIM');
    await expect(this.page.getByRole('heading', { name: /pim/i })).toBeVisible();
  }

  async openMyInfo() {
    await this.topNav.openModule('My Info');
    await expect(this.page.getByRole('heading', { name: /pim|personal details/i })).toBeVisible();
  }

  async openLeave() {
    await this.topNav.openModule('Leave');
    await expect(this.page.getByRole('heading', { name: /leave/i })).toBeVisible();
  }
}
