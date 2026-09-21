import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';

const login = new LoginPage();

describe('EspoCRM mobile authentication', () => {
  it('loads the localized demo login', async () => {
    await login.open();
    await expect(login.loginButton).toBeDisplayed();
  });

  it('logs in and renders the authenticated mobile shell', async () => {
    await login.login();
    await expect(login.searchInput).toBeDisplayed();
    await expect($('#navbar')).toBeDisplayed();
  });

  it('retains the authenticated session after reload', async () => {
    await login.login();
    await browser.refresh();
    await expect(login.searchInput).toBeDisplayed();
  });
});
