import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { EmployeePage } from '../pages/EmployeePage.js';
import { ProfilePage } from '../pages/ProfilePage.js';
import { LeavePage } from '../pages/LeavePage.js';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  employeePage: async ({ page }, use) => {
    await use(new EmployeePage(page));
  },

  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },

  leavePage: async ({ page }, use) => {
    await use(new LeavePage(page));
  }
});

export { expect };
