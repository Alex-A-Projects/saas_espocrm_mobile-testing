import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();

describe('Mobile Email workflows', () => {
  beforeEach(async () => { await login.login(); await navigation.openModule('Email'); });

  for (const folder of ['All', 'Inbox', 'Important', 'Sent', 'Archive', 'Drafts', 'Trash']) {
    it(`opens ${folder}`, async () => {
      await $(`#content a*=${folder}`).click();
      await expect($('#content h3')).toHaveText(expect.stringContaining('Emails'));
    });
  }

  it('opens and cancels Compose without sending', async () => {
    await $('#content button=Compose').click();
    const dialog = await $('[role="dialog"]');
    await expect(await dialog.$('button=Send')).toBeDisplayed();
    await (await dialog.$('button=Cancel')).click();
    await dialog.waitForDisplayed({ reverse: true });
  });
});
