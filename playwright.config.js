const { defineConfig, devices } = require('@playwright/test');

const PORT = 4100;

module.exports = defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'node .next/standalone/server.js',
    env: {
      ...process.env,
      HOSTNAME: '127.0.0.1',
      PORT: String(PORT),
      LEMENO_APP_URL: 'http://127.0.0.1:9',
      MONGODB_ATLAS_API_KEY: 'playwright-test',
    },
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: false,
    timeout: 30_000,
  },
  projects: [
    {
      name: 'desktop-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chromium',
      use: { ...devices['Pixel 7'] },
    },
  ],
});
