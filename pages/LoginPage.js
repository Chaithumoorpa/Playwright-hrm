import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = page.getByPlaceholder('Username').or(page.getByLabel(/username/i));
    this.password = page.getByPlaceholder('Password').or(page.getByLabel(/password/i));
    this.submit = page.getByRole('button', { name: /login/i });
    this.errorMessage = page.getByRole('alert').or(page.getByText(/invalid credentials|required/i));
  }

  async open() {
    await this.goto('/auth/login');
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.submit.click();
  }

  async expectLoginForm() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.submit).toBeEnabled();
  }

  async expectLoginError() {
    await expect(this.errorMessage).toBeVisible();
  }
}
