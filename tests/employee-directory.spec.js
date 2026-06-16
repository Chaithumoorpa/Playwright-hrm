import { test, expect } from '../fixtures/hrmsFixtures.js';
import { buildEmployee } from '../utils/testData.js';

test.describe('Employee Directory Management', () => {
  let employee;
  let createdEmployeeIds;

  test.beforeAll(() => {
    createdEmployeeIds = new Set();
  });

  test.beforeEach(async ({ dashboardPage }) => {
    employee = buildEmployee();
    await dashboardPage.goto('/dashboard/index');
    await dashboardPage.expectLoaded();
    await dashboardPage.openEmployees();
  });

  test('adds, edits, and deletes an employee record', async ({ employeePage }) => {
    await employeePage.addEmployee(employee);
    createdEmployeeIds.add(employee.employeeId);
    await employeePage.searchByEmployeeId(employee.employeeId);

    await employeePage.updateLastName(employee.employeeId, employee.editedLastName);
    await employeePage.openEmployeeRecord(employee.employeeId);
    await expect(employeePage.lastName).toHaveValue(employee.editedLastName);

    await employeePage.deleteEmployee(employee.employeeId);
    createdEmployeeIds.delete(employee.employeeId);
  });
});
