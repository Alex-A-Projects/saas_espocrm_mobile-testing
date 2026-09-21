import { baseConfig } from './config/base.conf.js';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  capabilities: [{
    platformName: 'iOS',
    browserName: 'Safari',
    'appium:automationName': 'XCUITest',
    'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 17 Pro',
    'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '26.0',
    'appium:noReset': false,
    'appium:newCommandTimeout': 180,
    'appium:safariInitialUrl': 'about:blank',
  }],
};
