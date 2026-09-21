import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';
import { ListPage } from '../src/pages/ListPage.js';
import { sidebarModules } from '../src/data/modules.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();
const list = new ListPage();

for (const [entity, plural] of sidebarModules) {
  describe(`${plural} mobile module`, () => {
    beforeEach(async () => { await login.login(); await navigation.openModule(entity); });

    it('opens from the responsive navigation drawer', async () => {
      expect(await browser.getUrl()).toContain(`#${entity}`);
      await expect(list.heading).toHaveText(expect.stringContaining(plural));
    });

    if (entity !== 'Calendar') {
      it('supports an empty-result search and clearing', async () => {
        await list.searchFor(`mobile-no-match-${Date.now()}`);
        await expect($('*=No Data')).toBeDisplayed();
        await list.clearSearch();
        await expect(list.search).toHaveValue('');
      });
    }

    if (!['Calendar', 'Email', 'KnowledgeBaseArticle'].includes(entity)) {
      it('opens the first available record', async () => {
        const opened = await list.openFirstRecord(entity);
        expect(opened).toBe(true);
        await expect($('#content .detail')).toBeDisplayed();
      });
    }
  });
}
