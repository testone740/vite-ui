import React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

const departmentOptions = [
  { label: 'HR', value: 'hr' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'IT', value: 'it' },
];

const getEmployees = () => [
  { fullName: 'Adam', dept: 'hr' },
  { fullName: 'John ', dept: 'sales' },
  { fullName: '', dept: '' },
];

const getColumns = () => [
  { columnId: 'fullName', width: 200 },
  { columnId: 'dept', width: 200 },
];

const headerRow = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Name' },
    { type: 'header', text: 'Department' },
  ],
};

const getRows = (rows) => {
  // console.log('rows', rows);
  return [
    headerRow,
    ...rows.map((row, idx) => {
      return {
        rowId: idx,
        cells: [
          { type: 'text', text: row.fullName },
          {
            type: 'dropdown',
            values: departmentOptions,
            isOpen: row.isOpen,
            selectedValue: row.dept,
          },
        ],
      };
    }),
  ];
};

const applyChanges = (changes, prevRows) => {
  // console.log('changes', changes);
  changes.forEach((change) => {
    const { rowId, columnId, newCell } = change;
    if (change.type === 'text') {
      prevRows[rowId][columnId] = newCell.text;
    }
    if (change.type === 'dropdown' && columnId === 'dept') {
      prevRows[rowId].isOpen = newCell.isOpen;
      if (
        newCell.selectedValue &&
        newCell.selectedValue !== change.previousCell.selectedValue
      ) {
        prevRows[rowId].dept = newCell.selectedValue;
      }
    }
  });
  return [...prevRows];
};

function App() {
  const [records, setRecords] = React.useState(getEmployees());
  const rows = getRows(records);
  const columns = getColumns();

  const handleChanges = (changes) => {
    setRecords((prevRecords) => applyChanges(changes, prevRecords));
  };

  return (
    <>
      <h3>Drop Down</h3>
      <ReactGrid
        rows={rows}
        columns={columns}
        onCellsChanged={handleChanges}
        enableFillHandle
        enableRowSelection
      />
    </>
  );
}

export default App;
