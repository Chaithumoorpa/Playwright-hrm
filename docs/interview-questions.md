# Advanced Interview Questions

## 1. How is global authentication state shared in this framework, and why does it save execution time?

The `setup` project in `play-wright.config.js` runs `tests/auth.setup.js` before the browser projects. That setup test logs in once through `LoginPage`, verifies the dashboard, and writes the browser context state to `playwright/.auth/hrms-admin.json` using `page.context().storageState({ path: authFile })`.

The `chromium`, `firefox`, and `webkit` projects declare `dependencies: ['setup']` and load the saved state with `use.storageState`. Every authenticated test starts with the same cookies and local storage that a real logged-in user would have, so the suite avoids repeating the login flow for each test. Login still remains covered in `tests/login.spec.js`, where `test.use({ storageState: { cookies: [], origins: [] } })` deliberately starts with a clean anonymous browser context.

## 2. Why does Playwright's auto-awaiting reduce flakiness compared to Selenium-style automation?

Playwright locators auto-wait for actionability before performing actions. For example, `LoginPage.login()` calls `this.username.fill(...)` and `this.submit.click()` without a manual sleep. Playwright waits for elements to be attached, visible, enabled, stable, and ready for input. Assertions such as `expect(dashboardPage.heading).toBeVisible()` also retry until the configured expectation timeout.

In Selenium frameworks, engineers often compensate for timing gaps with explicit waits or fixed sleeps. Fixed sleeps slow the suite and still fail under variable network or rendering conditions. This framework leans on locators and web-first assertions, so waits are tied to user-observable readiness instead of arbitrary time.

## 3. How do custom fixtures eliminate boilerplate in the test files?

`fixtures/hrmsFixtures.js` extends Playwright's base `test` and injects `loginPage`, `dashboardPage`, `employeePage`, `profilePage`, and `leavePage`. Tests receive page objects as named fixtures:

```js
test('updates employee profile details', async ({ dashboardPage, profilePage }) => {
  await dashboardPage.openMyInfo();
  await profilePage.updateNickname(nickname);
});
```

The test does not instantiate `new DashboardPage(page)` or import every page class. This centralizes object creation, keeps specs focused on business behavior, and makes future cross-cutting changes simple. For example, if page objects later need telemetry, API clients, or environment-aware behavior, that wiring can be added once in the fixture.

## 4. How does this framework manage parallel execution and avoid data collision?

The config enables `fullyParallel: true`, uses multiple workers, and runs each test in an isolated browser context. State isolation prevents one test's cookies or local storage mutations from leaking into another test.

Data collision is handled with generated data in `utils/testData.js`. `buildEmployee()` creates a unique employee id using the worker index, timestamp, and random suffix. That means parallel workers do not attempt to create, edit, or delete the same employee record. For production suites, the same strategy should be extended with teardown hooks, API-based data creation, and environment-level data namespaces such as branch, build id, and worker id.

## 5. What is the difference between component-level page objects and page-level objects in this repository?

Page-level objects model a complete screen or major workflow area. `EmployeePage` owns employee directory behavior such as adding, searching, editing, and deleting employees. `LeavePage` owns leave application behavior. These classes expose business actions instead of low-level selector details.

Component-level objects model reusable UI regions that appear across screens. `TopNavComponent` represents the application shell navigation and logout menu. `DashboardPage` composes it as `this.topNav = new TopNavComponent(page)`. This keeps shared navigation behavior out of every page class while avoiding a huge base page that knows too much about unrelated UI.
