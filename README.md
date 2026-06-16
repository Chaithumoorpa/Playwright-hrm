# Playwright HRMS Automation Framework

This repository contains a production-style Playwright framework for HRMS end-to-end testing with vanilla JavaScript, Page Object Model classes, reusable fixtures, shared authentication state, and multi-browser execution.

## Run

```bash
npm install
npx playwright install
npm test
```

Use these environment variables to point the suite at another HRMS deployment:

```bash
HRMS_BASE_URL=https://your-hrms.example.com
HRMS_USERNAME=Admin
HRMS_PASSWORD=admin123
```

## Structure

```text
fixtures/          Custom Playwright fixtures that inject page objects
pages/             Page-level and component-level objects
tests/             Setup and end-to-end scenario specs
utils/             Test data and small shared helpers
play-wright.config.js
```

The default URL and credentials target the public OrangeHRM demo application, while selectors use accessible locators such as `getByRole`, `getByLabel`, and `getByTestId`.
