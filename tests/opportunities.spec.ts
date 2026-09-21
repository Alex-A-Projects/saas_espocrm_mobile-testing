import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();

describe('Mobile Opportunity kanban', () => {
  beforeEach(async () => { await login.login(); await navigation.openModule('Opportunity'); });

  for (const stage of ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won']) {
    it(`shows ${stage} stage`, async () => {
      const stageHeader = await $(`#content th*=${stage}`);
      await stageHeader.scrollIntoView();
      await expect(stageHeader).toBeDisplayed();
    });
  }

  it('opens an opportunity card', async () => {
    await $('#content a[href^="#Opportunity/view/"]').click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('#Opportunity/view/'));
    await expect($('#content .detail')).toBeDisplayed();
  });
});
