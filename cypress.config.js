const { defineConfig } = require('cypress')
const requestMocker = require("cypress-request-mocker/plugin");

module.exports = defineConfig({
  e2e: {
    // Configure your E2E tests here
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,ts}",
    viewportWidth:1920,
    viewportHeight:1080,
    baseUrl: "https://electroshop.hackquest.com",
    requestMocker: {
      mockDate: "2023-02-09",
      interceptPattern: "https://electroshop.hackquest.com/api/**",
      harRecordOptions: {
        includeMimes: ["application/json"],
        includeHosts: ["electroshop.hackquest.com"],
        excludePaths: [],
      },
      baseURL: "https://electroshop.hackquest.com",
      harSaveOptions: {},
      recordAll: false,
      stubAll: true,
      cleanMocks: false,
      stubTests: [],
      recordTests: [],
      updateApiResponse: false,
      useCustomMakeRequest: false,
    },
    setupNodeEvents(on, config) {
      requestMocker(on, config);
    },

  },
})