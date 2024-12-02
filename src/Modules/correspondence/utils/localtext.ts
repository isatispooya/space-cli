import { GridLocaleText } from '@mui/x-data-grid';

export const localeText: Partial<GridLocaleText> = {
  noRowsLabel: 'بدون داده',
  noResultsOverlayLabel: 'نتیجه‌ای یافت نشد.',
  
  // فیلتر
  filterOperatorContains: 'شامل',
  filterOperatorEquals: 'مساوی',
  filterOperatorStartsWith: 'شروع با',
  filterOperatorEndsWith: 'پایان با',
  filterOperatorIsEmpty: 'خالی',
  filterOperatorIsNotEmpty: 'غیر خالی',
  
  // نوار ابزار
  toolbarFilters: 'فیلترها',
  toolbarExport: 'خروجی',
  toolbarQuickFilterPlaceholder: 'جستجو...',
  // پیجینیشن
  footerRowSelected: (count: number) => `${count} سطر انتخاب شده`,
  MuiTablePagination: {
    labelRowsPerPage: 'تعداد در صفحه:',
    labelDisplayedRows: ({ from, to, count }) =>
      `${from}-${to} از ${count !== -1 ? count : `بیش از ${to}`}`,
  }
};