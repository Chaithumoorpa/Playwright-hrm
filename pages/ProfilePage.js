import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class ProfilePage extends BasePage {
  constructor(page) {
    super(page);
    this.personalDetailsHeading = page.getByRole('heading', { name: /personal details/i });
    this.nickName = page.getByLabel(/nickname/i).or(page.getByTestId('profile-nickname'));
    this.saveButton = page.getByRole('button', { name: /save/i });
  }

  async expectLoaded() {
    await expect(this.personalDetailsHeading).toBeVisible();
  }

  async updateNickname(nickname) {
    await this.expectLoaded();
    await this.nickName.fill(nickname);
    await this.saveButton.first().click();
    await this.expectToast(/successfully updated|success/i);
  }

  async expectNickname(nickname) {
    await expect(this.nickName).toHaveValue(nickname);
  }
}
