import { expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

export class EmployeePage extends BasePage {
  constructor(page) {
    super(page);
    this.addEmployeeLink = page.getByRole('link', { name: /add employee/i });
    this.employeeListLink = page.getByRole('link', { name: /employee list/i });
    this.firstName = page.getByPlaceholder('First Name').or(page.getByLabel(/first name/i));
    this.middleName = page.getByPlaceholder('Middle Name').or(page.getByLabel(/middle name/i));
    this.lastName = page.getByPlaceholder('Last Name').or(page.getByLabel(/last name/i));
    this.employeeId = page.getByLabel(/employee id/i).or(page.getByTestId('employee-id'));
    this.saveButton = page.getByRole('button', { name: /save/i });
    this.searchButton = page.getByRole('button', { name: /search/i });
  }

  async openAddEmployee() {
    await this.addEmployeeLink.click();
    await expect(this.page.getByRole('heading', { name: /add employee/i })).toBeVisible();
  }

  async openEmployeeList() {
    await this.employeeListLink.click();
    await expect(this.page.getByRole('heading', { name: /employee information/i })).toBeVisible();
  }

  async addEmployee(employee) {
    await this.openAddEmployee();
    await this.firstName.fill(employee.firstName);
    await this.middleName.fill(employee.middleName);
    await this.lastName.fill(employee.lastName);
    await this.employeeId.fill(employee.employeeId);
    await this.saveButton.click();
    await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();
  }

  async searchByEmployeeId(employeeId) {
    await this.openEmployeeList();
    await this.employeeId.fill(employeeId);
    await this.searchButton.click();
    await expect(this.page.getByRole('cell', { name: employeeId })).toBeVisible();
  }

  async openEmployeeRecord(employeeId) {
    await this.searchByEmployeeId(employeeId);
    await this.page.getByRole('row', { name: new RegExp(employeeId) }).getByRole('button').first().click();
    await expect(this.page.getByRole('heading', { name: /personal details/i })).toBeVisible();
  }

  async updateLastName(employeeId, newLastName) {
    await this.openEmployeeRecord(employeeId);
    await this.lastName.fill(newLastName);
    await this.saveButton.first().click();
    await this.expectToast(/successfully updated|success/i);
  }

  async deleteEmployee(employeeId) {
    await this.searchByEmployeeId(employeeId);
    const row = this.page.getByRole('row', { name: new RegExp(employeeId) });
    await row.getByRole('button', { name: /delete/i }).click();
    await this.confirmDialog();
    await this.expectToast(/successfully deleted|success/i);
    await expect(this.page.getByRole('cell', { name: employeeId })).toHaveCount(0);
  }
}
