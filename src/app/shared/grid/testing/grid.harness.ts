import { ComponentHarness } from '@angular/cdk/testing';
import { HeaderMenuDropdownHarness } from '../header-menu-dropdown/testing/header-menu-dropdown.harness';

export class GridComponentHarness extends ComponentHarness {
  static hostSelector = 'wkt-grid';

  grid = this.locatorFor('[ta="exercise-grid"]');
  headers = async () =>
    this.locatorForAll('[ta="exercise-grid__header"]')().then(
      async (headers) => await Promise.all(headers.map((h) => h.text())),
    );
  rows = this.locatorForAll('[ta="exercise-grid__row"]');
  cells = this.locatorForAll('[ta="exercise-grid__cell"]');
  headerContextMenuCell = this.locatorFor(
    '[ta="exercise-grid__header-context-menu"]',
  );
  headerContextMenuTriggerButton = this.locatorFor(
    '[ta="exercise-grid__header-context-menu-trigger"]',
  );
  headerContextMenu = this.documentRootLocatorFactory().locatorForOptional(
    HeaderMenuDropdownHarness,
  );
  openHeaderContextMenu = () =>
    this.headerContextMenuTriggerButton().then((b) => b.click());
  rowContextMenuCells = this.locatorForAll(
    '[ta="exercise-grid__row-context-menu"]',
  );
  rowsCount = async () => this.rows().then((r) => r.length);
  headersCount = async () => this.headers().then((h) => h.length);
}
