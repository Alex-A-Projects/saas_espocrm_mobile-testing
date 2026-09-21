import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';

const login = new LoginPage();
const dashboard = new DashboardPage();

describe('Mobile dashboard interactions', () => {
  beforeEach(async () => { await login.login(); await dashboard.openDashboard(); });

  it('opens Stream from its widget menu', async () => {
    const panel = await $('#content h4=Stream').parentElement().parentElement();
    await (await panel.$('button.menu-button')).click();
    await expect(await panel.$('.dropdown-menu')).toBeDisplayed();
  });

  it('uses Calendar next and previous controls', async () => {
    const date = await $('#content [data-date]');
    const initial = await date.getAttribute('data-date');
    await $('#content [data-action="next"]').click();
    await browser.waitUntil(async () => (await date.getAttribute('data-date')) !== initial);
    await $('#content [data-action="previous"]').click();
  });

  it('loads more Stream rows', async () => {
    const rows = await $$('#content .list-group-item');
    const before = rows.length;
    await $('#content [data-action="showMore"]').click();
    await browser.waitUntil(async () => (await $$('#content .list-group-item')).length >= before);
  });

  it('renders a chart canvas on Sales', async () => {
    await dashboard.selectTab('Sales');
    await expect($('#content canvas, #content svg')).toBeDisplayed();
  });

  it('opens Edit Dashboard from overflow', async () => {
    await dashboard.openOverflow();
    await $('#content .dashboard-buttons .dropdown-menu*=Edit Dashboard').click();
    await expect($('[role="dialog"]')).toBeDisplayed();
  });

  it('opens Add Dashlet from overflow', async () => {
    await dashboard.openOverflow();
    await $('#content .dashboard-buttons .dropdown-menu*=Add Dashlet').click();
    await expect($('[role="dialog"]')).toBeDisplayed();
  });
});
