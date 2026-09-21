import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { MobileNavigationPage } from '../src/pages/MobileNavigationPage.js';

const login = new LoginPage();
const navigation = new MobileNavigationPage();
const createEntities = [
  ['Account', 'Create Account'], ['Contact', 'Create Contact'], ['Lead', 'Create Lead'],
  ['Opportunity', 'Create Opportunity'], ['Meeting', 'Create Meeting'], ['Call', 'Create Call'],
  ['Task', 'Create Task'], ['Case', 'Create Case'], ['KnowledgeBaseArticle', 'Create Article'],
  ['Document', 'Create Document'],
] as const;

for (const [entity, createLabel] of createEntities) {
  describe(`${entity} mobile create form`, () => {
    beforeEach(async () => { await login.login(); await navigation.openModule(entity); });

    it('opens create and exposes primary controls without saving', async () => {
      const create = await $(`#content a*=${createLabel}`);
      await create.click();
      const dialog = await $('[role="dialog"]');
      if (await dialog.isExisting()) {
        await expect(await dialog.$('button=Save')).toBeDisplayed();
        await expect(await dialog.$('button=Cancel')).toBeDisplayed();
        await (await dialog.$('button=Cancel')).click();
      } else {
        await expect($('#content button=Save')).toBeDisplayed();
        await expect($('#content button=Cancel')).toBeDisplayed();
        await $('#content button=Cancel').click();
      }
    });
  });
}
