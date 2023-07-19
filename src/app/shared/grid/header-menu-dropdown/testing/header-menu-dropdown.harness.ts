import { ComponentHarness } from '@angular/cdk/testing';

export class HeaderMenuDropdownHarness extends ComponentHarness {
  static hostSelector = 'wkt-header-menu-drop-down';
  getFieldLabelByText = async (text: string) => {
    const labels = await this.locatorForAll('[ta="dropdown-menu__label"]')();
    const index = await Promise.all(labels?.map((l) => l.text())).then((res) =>
      res.findIndex((l) => l.includes(text)),
    );
    return index >= 0 ? labels[index] : undefined;
  };
}
