import { test, expect } from '@playwright/test';
import { mkdirSync } from 'node:fs';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

const authFile = 'playwright/.auth/hrms-admin.json';

test('authenticate HRMS admin user', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.open();
  await loginPage.login(
    process.env.HRMS_USERNAME ?? 'Admin',
    process.env.HRMS_PASSWORD ?? 'admin123'
  );

  await dashboardPage.expectLoaded();
  await expect(page).toHaveURL(/dashboard/);
  mkdirSync('playwright/.auth', { recursive: true });
  await page.context().storageState({ path: authFile });
});
