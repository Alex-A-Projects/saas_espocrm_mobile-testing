import { expect } from '@wdio/globals';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';
import { dashboardTabs } from '../src/data/modules.js';

const login = new LoginPage();
const dashboard = new DashboardPage();

const expectedWidgets: Record<string, string[]> = {
  Homepage: ['Stream', 'Calendar', 'My Activities', 'My Cases'],
  Sales: ['Revenue by month', 'Opportunities by Lead Source', 'My Opportunities', 'My Leads'],
  Analytics: ['Opportunities by user', 'Sales Pipeline', 'Opportunities by Stage'],
  'Sales Manager': ["Calls today's", 'Leads converted', 'My Opportunities', 'Calendar'],
  'Call Center': ['My Calls', "Calls today's", 'Calls by status', 'Stream'],
  Projects: ['Projects', 'My Work Tasks', 'My Triage Tasks'],
};

describe('Responsive dashboard tabs', () => {
  beforeEach(async () => { await login.login(); await dashboard.openDashboard(); });

  for (const tab of dashboardTabs) {
    it(`opens ${tab} and renders its mobile widgets`, async () => {
      await dashboard.selectTab(tab);
      const titles = await dashboard.widgetTitles();
      for (const widget of expectedWidgets[tab]) expect(titles).toContain(widget);
    });
  }

  it('switches through all dashboard tabs without leaving Home', async () => {
    for (const tab of dashboardTabs) await dashboard.selectTab(tab);
    expect(await browser.getUrl()).toContain('demo.us.espocrm.com');
  });

  it('opens the dashboard overflow menu', async () => {
    await dashboard.openOverflow();
    await expect($('#content .dashboard-buttons .dropdown-menu')).toHaveText(expect.stringContaining('Edit Dashboard'));
    await expect($('#content .dashboard-buttons .dropdown-menu')).toHaveText(expect.stringContaining('Add Dashlet'));
  });
});
