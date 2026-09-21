import { $ } from '@wdio/globals';
import { BasePage } from './BasePage.js';

export class HeaderPage extends BasePage {
  get search() { return $('#navbar input[placeholder="Search"]'); }
  get lastViewed() { return $('#navbar [title="Last Viewed"]'); }
  get create() { return $('#navbar [title="Create"]'); }
  get notifications() { return $('#navbar [title="Notifications"]'); }
  get menu() { return $('#navbar [title="Menu"]'); }

  async clickAndWait(title: string, target: string): Promise<void> {
    await $(`#navbar [title="${title}"]`).click();
    await $(target).waitForDisplayed();
  }
}
