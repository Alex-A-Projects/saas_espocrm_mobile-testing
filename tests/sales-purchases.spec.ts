import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';
import { extensionModules } from '../src/data/extensions.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();

describe('Mobile Sales & Purchases navigation', () => {
  beforeEach(async () => { await login.login(); await navigation.openDrawer(); });

  for (const [entity, plural] of extensionModules.slice(1, 13)) {
    it(`opens ${plural} from the grouped navigation`, async () => {
      const group = await $('#navbar button*=S');
      if (!(await $(`#navbar a[href="#${entity}"]`)).isDisplayed()) await group.click();
      await $(`#navbar a[href="#${entity}"]`).click();
      await expect($('#content h3')).toHaveText(expect.stringContaining(plural));
    });
  }
});
