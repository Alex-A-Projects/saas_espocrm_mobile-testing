import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { HeaderPage } from '../src/pages/HeaderPage.js';
import { quickCreateEntities } from '../src/data/extensions.js';

const login = new LoginPage();
const header = new HeaderPage();

describe('Mobile global quick create', () => {
  beforeEach(async () => { await login.login(); });

  for (const [entity, primaryAction] of quickCreateEntities) {
    it(`opens and cancels ${entity} quick create`, async () => {
      await header.clickAndWait('Create', '#navbar .dropdown-menu');
      await $(`#navbar a[data-action="quickCreate"][data-name="${entity}"]`).click();
      const dialog = await $('[role="dialog"]');
      await dialog.waitForDisplayed();
      await expect(await dialog.$(`button=${primaryAction}`)).toBeDisplayed();
      await (await dialog.$('button=Cancel')).click();
      await dialog.waitForDisplayed({ reverse: true });
    });
  }
});
