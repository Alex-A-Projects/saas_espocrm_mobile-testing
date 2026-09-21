import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();

describe('Mobile Knowledge Base', () => {
  beforeEach(async () => { await login.login(); await navigation.openModule('KnowledgeBaseArticle'); });

  for (const category of ['User Guide', 'Administration', 'Extensions']) {
    it(`shows ${category} category`, async () => {
      await expect($(`#content a*=${category}`)).toBeDisplayed();
    });
  }

  it('opens a category result list', async () => {
    await $('#content a[href^="#KnowledgeBaseArticle/list/categoryId="]').click();
    await expect(browser.getUrl()).resolves.toContain('#KnowledgeBaseArticle/list/categoryId=');
  });
});
