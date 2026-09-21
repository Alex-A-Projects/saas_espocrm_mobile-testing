import { $, browser } from '@wdio/globals';
import { BasePage } from './BasePage.js';

export class MobileNavigationPage extends BasePage {
  get menuToggle() { return $('#navbar button.navbar-toggle'); }
  get navbar() { return $('#navbar'); }

  async openDrawer(): Promise<void> {
    const account = await this.navbar.$('a[href="#Account"]');
    if (!await account.isDisplayed()) {
      await this.menuToggle.click();
      await account.waitForDisplayed();
    }
  }

  async openModule(entity: string): Promise<void> {
    await this.openDrawer();
    const link = await this.navbar.$(`a[href="#${entity}"]`);
    await link.scrollIntoView();
    await link.click();
    await browser.waitUntil(async () => (await browser.getUrl()).includes(`#${entity}`));
    await this.content.waitForDisplayed();
  }
}
