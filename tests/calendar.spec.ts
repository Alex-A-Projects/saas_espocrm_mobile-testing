import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();

describe('Mobile Calendar', () => {
  beforeEach(async () => { await login.login(); await navigation.openModule('Calendar'); });

  it('renders calendar dates', async () => {
    await expect($('#content [data-date]')).toBeDisplayed();
  });

  it('moves forward and backward', async () => {
    const date = $('#content [data-date]');
    const initial = await date.getAttribute('data-date');
    await $('#content [data-action="next"]').click();
    await browser.waitUntil(async () => (await date.getAttribute('data-date')) !== initial);
    await $('#content [data-action="prev"]').click();
    await browser.waitUntil(async () => (await date.getAttribute('data-date')) === initial);
  });

  it('returns to today after paging', async () => {
    await $('#content [data-action="next"]').click();
    const today = $('#content [data-action="today"]');
    await today.click();
    await expect(today).toHaveElementClass(expect.stringContaining('active'));
  });
});
