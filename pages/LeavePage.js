import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class LeavePage extends BasePage {
  constructor(page) {
    super(page);
    this.applyLink = page.getByRole('link', { name: /apply/i });
    this.myLeaveLink = page.getByRole('link', { name: /my leave/i });
    this.leaveType = page.getByLabel(/leave type/i).or(page.getByTestId('leave-type'));
    this.fromDate = page.getByLabel(/from date/i).or(page.getByPlaceholder(/yyyy-mm-dd/i).first());
    this.toDate = page.getByLabel(/to date/i).or(page.getByPlaceholder(/yyyy-mm-dd/i).last());
    this.comments = page.getByLabel(/comments/i).or(page.getByPlaceholder(/comments/i));
    this.applyButton = page.getByRole('button', { name: /apply/i });
    this.searchButton = page.getByRole('button', { name: /search/i });
  }

  async openApplyLeave() {
    await this.applyLink.click();
    await expect(this.page.getByRole('heading', { name: /apply leave/i })).toBeVisible();
  }

  async applyLeave(request) {
    await this.openApplyLeave();
    await this.leaveType.click();
    await this.page.getByRole('option', { name: request.leaveType }).click();
    await this.fromDate.fill(request.fromDate);
    await this.toDate.fill(request.toDate);
    await this.comments.fill(request.comment);
    await this.applyButton.click();
    await this.expectToast(/successfully saved|success/i);
  }

  async openMyLeave() {
    await this.myLeaveLink.click();
    await expect(this.page.getByRole('heading', { name: /my leave list|leave list/i })).toBeVisible();
  }

  async expectLeaveRequestVisible(request) {
    await this.openMyLeave();
    await this.fromDate.fill(request.fromDate);
    await this.toDate.fill(request.toDate);
    await this.searchButton.click();
    await expect(this.page.getByRole('row', { name: new RegExp(request.leaveType, 'i') })).toBeVisible();
  }
}
