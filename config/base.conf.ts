import 'dotenv/config';

export const appUrl = process.env.ESPOCRM_URL || 'https://demo.us.espocrm.com/?l=en_US';

export const baseConfig: Partial<WebdriverIO.Config> = {
  runner: 'local',
  specs: ['./tests/**/*.spec.ts'],
  maxInstances: 1,
  logLevel: 'warn',
  bail: 0,
  baseUrl: appUrl,
  waitforTimeout: 15_000,
  connectionRetryTimeout: 120_000,
  connectionRetryCount: 2,
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { ui: 'bdd', timeout: 90_000 },
  services: [['appium', {
    command: 'appium',
    args: {
      address: process.env.APPIUM_HOST || '127.0.0.1',
      port: Number(process.env.APPIUM_PORT || 4723),
      basePath: '/',
    },
  }]],
  before: async () => {
    await browser.setTimeout({ implicit: 0, pageLoad: 60_000, script: 30_000 });
  },
  afterTest: async (_test, _context, result) => {
    if (!result.passed) {
      const safeName = `${Date.now()}-${browser.capabilities.platformName}`.replace(/[^a-zA-Z0-9-]/g, '_');
      await browser.saveScreenshot(`./artifacts/screenshots/${safeName}.png`);
    }
  },
};
