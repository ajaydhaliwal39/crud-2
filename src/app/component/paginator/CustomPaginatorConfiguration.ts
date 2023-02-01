import { MatPaginatorIntl } from '@angular/material/paginator';
// import { TranslateService } from '@ngx-translate/core';

export function CustomPaginator() {
  const customPaginatorIntl = new MatPaginatorIntl();

  customPaginatorIntl.itemsPerPageLabel = '';
  return customPaginatorIntl;
}
// translate:TranslateService