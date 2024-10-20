import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './acceptanceTests/web', // Updated to reflect new test location
  use: {
    baseURL: 'http://localhost:3000', // Adjust this if your server runs on a different port
  },
  reporter: 'list',
};

export default config;
