import { $, browser } from '@wdio/globals';
import { BasePage } from './BasePage.js';

export class ListPage extends BasePage {
  get heading() { return $('#content h3'); }
  get search() { return $('#content input[data-name="textFilter"]'); }
  get firstRow() { return $('#content tr[data-id]'); }

  async open(entity: string): Promise<void> {
    await super.open(entity);
    await this.heading.waitForDisplayed();
    await this.search.waitForDisplayed();
  }

  async searchFor(text: string): Promise<void> {
    await this.search.setValue(text);
    await browser.keys('Enter');
    await $('*=No Data').waitForDisplayed();
  }

  async clearSearch(): Promise<void> {
    await this.search.clearValue();
    await browser.keys('Enter');
    await browser.waitUntil(async () => (await this.search.getValue()) === '');
  }

  async openFirstRecord(entity: string): Promise<boolean> {
    const link = await $(`#content a[href^="#${entity}/view/"]:not([data-action="quickView"])`);
    if (!await link.isExisting()) return false;
    await link.click();
    await browser.waitUntil(async () => new RegExp(`#${entity}/view/`).test(await browser.getUrl()));
    return true;
  }
}
