import { $, browser } from '@wdio/globals';
import { appUrl } from '../../config/base.conf.js';

export class BasePage {
  protected content = $('#content');

  async open(hash = ''): Promise<void> {
    const root = appUrl.replace(/#.*$/, '');
    await browser.url(hash ? `${root}#${hash}` : root);
    await this.content.waitForDisplayed();
  }

  async displayed(selector: string): Promise<boolean> {
    const element = await $(selector);
    return element.isDisplayed();
  }
}
