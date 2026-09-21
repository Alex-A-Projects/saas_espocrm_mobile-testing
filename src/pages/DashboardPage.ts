import { $, $$, browser } from '@wdio/globals';
import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  async openDashboard(): Promise<void> { await this.open(''); }

  async selectTab(name: string): Promise<void> {
    const tab = await $(`//button[@data-action="selectTab" and normalize-space(.)="${name}"]`);
    await tab.scrollIntoView();
    await tab.click();
    await browser.waitUntil(async () => (await tab.getAttribute('class'))?.includes('active') === true);
  }

  async widgetTitles(): Promise<string[]> {
    const titles = await $$('#content h4');
    const visible: string[] = [];
    for (const title of titles) if (await title.isDisplayed()) visible.push((await title.getText()).trim());
    return visible;
  }

  async openOverflow(): Promise<void> {
    const button = await $('#content .dashboard-buttons button.dropdown-toggle');
    await button.click();
    await $('#content .dashboard-buttons .dropdown-menu').waitForDisplayed();
  }
}
