import { test as base } from '@playwright/test';
import app from '../../src/api/server';
import { AddressInfo } from 'net';

type TestFixtures = {
  baseURL: string;
};

export const test = base.extend<TestFixtures>({
  baseURL: async ({}, use) => {
    const server = app.listen(0);
    const address = server.address() as AddressInfo;
    const baseURL = `http://localhost:${address.port}`;

    await use(baseURL);

    await new Promise<void>((resolve) => server.close(() => resolve()));
  },
});

export { expect } from '@playwright/test';
