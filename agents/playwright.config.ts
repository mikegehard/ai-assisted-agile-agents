import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './acceptanceTests', // Changed from './tests' to '.'
  use: {
    baseURL: 'http://localhost:3000', // Adjust this if your server runs on a different port
  },
  reporter: 'list',
};

export default config;
