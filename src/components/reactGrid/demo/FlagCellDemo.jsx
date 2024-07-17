import * as React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.scss';
import { FlagCellTemplate } from './FlagCellTemplate';

const getFlags = () => [
  { isoCode: 'US' },
  { isoCode: 'CA' },
  { isoCode: 'MX' },
  { isoCode: '' },
];

const getColumns = () => [{ columnId: 'flag', width: 150 }];

const headerRow = {
  rowId: 'header',
  height: 40,
  cells: [{ type: 'header', text: 'Flags' }],
};

const getRows = (flags) => [
  headerRow,
  ...flags.map((flag, idx) => ({
    rowId: idx,
    height: 50,
    cells: [{ type: 'flag', text: flag.isoCode }],
  })),
];

function DateCellDemo() {
  const [flags] = React.useState(getFlags());

  const rows = getRows(flags);
  const columns = getColumns();

  return (
    <ReactGrid
      rows={rows}
      columns={columns}
      customCellTemplates={{ flag: new FlagCellTemplate() }}
    />
  );
}

export default DateCellDemo;
