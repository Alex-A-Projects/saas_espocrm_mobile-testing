import { $, browser } from '@wdio/globals';
import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  get loginButton() { return $('button=Login'); }
  get searchInput() { return $('input[placeholder="Search"]'); }

  async login(): Promise<void> {
    await this.open();
    if (await this.loginButton.isExisting()) {
      await this.loginButton.waitForClickable();
      await this.loginButton.click();
    }
    await this.searchInput.waitForDisplayed();
    await browser.waitUntil(async () => (await browser.getUrl()).includes('demo.us.espocrm.com'));
  }
}
