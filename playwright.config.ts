import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import * as dotenv from 'dotenv';
import * as path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env.dev') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  projects: [
    // {
    //   name: 'setup',
    //   testMatch: /.*\.setup\.ts/,
    //   use: { baseURL: process.env.BASE_URL},
    // },
    {
      name: 'ui',
      use: { ...devices['Desktop Chrome'], 
        baseURL: process.env.BASE_URL, 
        video: 'on',
        // storageState: '.playwright/.auth.json',
      },
      testDir: './tests',
      // dependencies: ['setup'],
    },

    {
      name: 'api',
      use: { ...devices['Desktop Chrome'], 
        baseURL: "https://petstore3.swagger.io/api/v3/", 
        headless: true,
      },
      testDir: './api/tests'
    },
  ],
});
