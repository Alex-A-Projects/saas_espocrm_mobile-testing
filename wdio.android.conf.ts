import { baseConfig } from './config/base.conf.js';

export const config: WebdriverIO.Config = {
  ...baseConfig,
  capabilities: [{
    platformName: 'Android',
    browserName: 'Chrome',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Galaxy_S25_API_35',
    'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '15',
    'appium:avd': process.env.ANDROID_AVD || 'Galaxy_S25_API_35',
    'appium:noReset': false,
    'appium:newCommandTimeout': 180,
    'appium:autoGrantPermissions': true,
  }],
};
