# ElectroShop QA

This project contains end-to-end tests for ElectroShop using Cypress.

## Prerequisites

- Node.js (v14 or later)
- npm (usually comes with Node.js)

## Installation

1. Clone this repository:

```
git clone https://github.com/Habeeb-MD/electroshop-qa.git
```

2. Navigate to the project directory:

```
cd electroshop-qa
```

3. Install the dependencies:

```
npm install
```

## Running Tests

### Open Cypress Test Runner

To open the Cypress Test Runner, use the following command:

```
npm run cypress:open
```

This will open the Cypress Test Runner, where you can select and run individual tests.

### Run Tests in Chrome

To run all tests in Chrome, use:

```
npm run cypress:run
```

### Run Tests in Firefox

To run all tests in Firefox, use:

```
npm run cypress:run:firefox
```

### Run Tests in Edge

To run all tests in Edge, use:

```
npm run cypress:run:edge
```

## Project Structure

```
electroshop-qa/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── periodic_task.yml
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   ├── auth-context.spec.js
│   │   │   ├── forget-password.spec.js
│   │   │   ├── login.spec.js
│   │   │   ├── register.spec.js
│   │   │   └── reset-password.spec.js
│   │   ├── cart.spec.js
│   │   ├── home.spec.js
│   │   └── navigation.spec.js
│   ├── fixtures/
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── cypress.config.js
├── package.json
└── README.md
```

- `cypress/e2e/`: Contains all the test files
- `cypress/fixtures/`: Contains static data used in tests
- `cypress/support/`: Contains custom commands and other support files
- `cypress.config.js`: Cypress configuration file
- `.github/workflows/`: Contains GitHub Actions workflow files

## Stubbing API Responses

This project uses the cypress-request-mocker plugin to stub responses for product endpoints. I developed this plugin
for efficient testing by mocking API responses. This approach reduces dependency on the
backend and allows for consistent, predictable test results.

For more information on using cypress-request-mocker, refer to the plugin's documentation.

## Custom Commands

Added some custom commands to simplify common tasks:

- `cy.login(email, password)`: Logs in a user

You can find these commands in `cypress/support/commands.js`.

## CI/CD Integration

This project is set up to run in GitHub Actions for CI/CD. Two workflows are configured:

1. **Cypress Tests (ci.yml)**: This workflow runs on every push to the repository. It checks out the code, sets up the
   environment, and runs the Cypress tests.

2. **Cypress Daily Run (periodic_task.yml)**: This workflow is scheduled to run twice daily at 6 AM and 6 PM UTC. It
   performs the same steps as the push workflow but is triggered automatically on a schedule.

Both workflows use Ubuntu 24.04 as the running environment and utilize the `cypress-io/github-action@v6` to run the
tests. They also upload test artifacts (screenshots and videos) in case of test failures.

To view the workflow runs and their results, check the "Actions" tab in the GitHub repository.

## Contact

Habeeb-MD https://github.com/Habeeb-MD

Project Link: [https://github.com/Habeeb-MD/electroshop-qa](https://github.com/Habeeb-MD/electroshop-qa)
