import { test, expect } from '../fixtures/hrmsFixtures.js';

test.describe('Login', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  let validUser;

  test.beforeAll(() => {
    validUser = {
      username: process.env.HRMS_USERNAME ?? 'Admin',
      password: process.env.HRMS_PASSWORD ?? 'admin123'
    };
  });

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('logs in with valid credentials', async ({ loginPage, dashboardPage, page }) => {
    await loginPage.login(validUser.username, validUser.password);

    await dashboardPage.expectLoaded();
    await expect(page).toHaveURL(/dashboard/);
  });

  test('shows validation for invalid credentials', async ({ loginPage }) => {
    await loginPage.login('invalid.user', 'incorrect-password');
    await loginPage.expectLoginError();
  });
});
