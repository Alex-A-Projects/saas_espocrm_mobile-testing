import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';
import { ListPage } from '../src/pages/ListPage.js';
import { sidebarModules } from '../src/data/modules.js';
import { extensionModules } from '../src/data/extensions.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();
const list = new ListPage();
const browsable = [...sidebarModules.filter(([entity]) => entity !== 'Calendar'), ...extensionModules];

for (const [entity, plural] of browsable) {
  describe(`${plural} mobile browsing`, () => {
    beforeEach(async () => { await login.login(); });

    it('opens with its heading and search control', async () => {
      await list.open(entity);
      await expect(list.heading).toHaveText(expect.stringContaining(plural));
      await expect(list.search).toBeDisplayed();
    });

    it('shows no results for an unknown query and clears it', async () => {
      await list.open(entity);
      await list.searchFor(`mobile-${entity}-${Date.now()}`);
      await expect($('*=No Data')).toBeDisplayed();
      await list.clearSearch();
      await expect(list.search).toHaveValue('');
    });
  });
}
