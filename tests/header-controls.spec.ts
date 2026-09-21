import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { HeaderPage } from '../src/pages/HeaderPage.js';

const login = new LoginPage();
const header = new HeaderPage();

describe('Mobile top-right controls', () => {
  beforeEach(async () => { await login.login(); });

  it('shows global search and all header actions', async () => {
    await expect(header.search).toBeDisplayed();
    await expect(header.lastViewed).toBeDisplayed();
    await expect(header.create).toBeDisplayed();
    await expect(header.notifications).toBeDisplayed();
    await expect(header.menu).toBeDisplayed();
  });

  it('shows a known global-search suggestion', async () => {
    await header.search.setValue('Intelacard');
    await browser.keys('Enter');
    await expect($('#navbar a=Intelacard')).toBeDisplayed();
  });

  it('opens Last Viewed', async () => {
    await header.clickAndWait('Last Viewed', '#last-viewed-panel');
    await expect($('#last-viewed-panel')).toHaveText(expect.stringContaining('Last Viewed'));
  });

  it('opens quick create with all supported entities', async () => {
    await header.clickAndWait('Create', '#navbar .dropdown-menu');
    for (const name of ['Account', 'Contact', 'Lead', 'Opportunity', 'Meeting', 'Call', 'Task', 'Case', 'Email', 'Project Task']) {
      await expect((await $('#navbar .dropdown-menu')).$(`a=${name}`)).toBeDisplayed();
    }
  });

  it('opens Notifications', async () => {
    await header.clickAndWait('Notifications', '#notifications-panel');
    await expect($('#notifications-panel')).toHaveText(expect.stringContaining('Notifications'));
  });

  it('opens the user menu', async () => {
    await header.clickAndWait('Menu', '#navbar .dropdown-menu');
    for (const command of ['Administration', 'Preferences', 'About', 'Log Out']) {
      await expect((await $('#navbar .dropdown-menu')).$(`a=${command}`)).toBeDisplayed();
    }
  });
});
