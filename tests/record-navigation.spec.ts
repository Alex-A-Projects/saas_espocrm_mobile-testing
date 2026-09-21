import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { ListPage } from '../src/pages/ListPage.js';

const login = new LoginPage();
const list = new ListPage();
const recordEntities = ['Account', 'Contact', 'Lead', 'Meeting', 'Call', 'Task', 'Case', 'Document', 'Project', 'ProjectTask'] as const;

for (const entity of recordEntities) {
  it(`opens a ${entity} record from its mobile list`, async () => {
    await login.login();
    await list.open(entity);
    expect(await list.openFirstRecord(entity)).toBe(true);
    await expect($('#content .detail')).toBeDisplayed();
  });
}
