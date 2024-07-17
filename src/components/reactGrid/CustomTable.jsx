import React, { useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { CellTemplates } from './cells';

const getEmployees = () => [
  {
    id: 11,
    fName: 'Thomas',
    lName: 'Brown',
    hiredAt: new Date('01/01/2020'),
    dept: 'hr',
  },
  {
    id: 12,
    fName: 'Susie',
    lName: 'Lane',
    hiredAt: new Date('10-15-2020'),
    dept: 'sales',
  },
  // { id: 13, fName: 'John', lName: 'Doe', hiredAt: '', dept: '' },
  // { id: '', fName: '12-15-2020', lName: '12/16/2020', hiredAt: '', dept: '' },
];

const getColumns = () => [
  { columnId: 'id', width: 100 },
  { columnId: 'fName', width: 150 },
  { columnId: 'lName', width: 150 },
  { columnId: 'hiredAt', width: 150 },
  { columnId: 'dept', width: 150 },
];

const headerRow = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Emp. ID' },
    { type: 'header', text: 'First Name' },
    { type: 'header', text: 'Last Name' },
    { type: 'header', text: 'Hire Date' },
    { type: 'header', text: 'Department' },
  ],
};

const departmentOptions = [
  { label: 'HR', value: 'hr' },
  { label: 'Sales', value: 'sales' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Finance', value: 'finance' },
  { label: 'IT', value: 'it' },
];

const getRows = (items) => [
  headerRow,
  ...items.map((item, idx) => {
    // console.log('item', item);
    return {
      rowId: idx,
      cells: [
        { type: 'number', value: item.id },
        { type: 'text', text: item.fName },
        { type: 'text', text: item.lName },
        { type: 'date', date: item.hiredAt },
        {
          type: 'dropdown',
          values: departmentOptions,
          isOpen: item.isOpen,
          selectedValue: item.dept,
        },
      ],
    };
  }),
];

const applyCellChanges = (changes, prevRows) => {
  console.log('changes', changes);
  console.log('prevRows', prevRows);

  changes.forEach((change) => {
    const { rowId, columnId, newCell } = change;

    if (newCell.type === 'number') {
      prevRows[rowId][columnId] = newCell.value;
    }
    if (newCell.type === 'text') {
      prevRows[rowId][columnId] = newCell.text;
    }
    if (newCell.type === 'date') {
      prevRows[rowId][columnId] = new Date(newCell.value);
    }
    if (change.type === 'dropdown' && change.columnId === 'dept') {
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

const CustomTable = () => {
  const [employees, setEmployees] = useState(getEmployees());
  const [columns] = useState(getColumns());

  const rows = getRows(employees);

  const handleChanges = (changes) => {
    setEmployees((prevItems) => applyCellChanges(changes, prevItems));
  };

  const handleContextMenu = (
    selectedRowIds,
    selectedColIds,
    selectionMode,
    menuOptions
  ) => {
    if (selectionMode === 'row') {
      menuOptions = [
        ...menuOptions,
        {
          id: 'removePerson',
          label: 'Remove person',
          handler: () => {
            setEmployees((prevPeople) => {
              return [
                ...prevPeople.filter(
                  (person, idx) => !selectedRowIds.includes(idx)
                ),
              ];
            });
          },
        },
      ];
    }
    return menuOptions;
  };

  return (
    <>
      <h3>Table with Custom Cells</h3>
      <ReactGrid
        columns={columns}
        rows={rows}
        customCellTemplates={CellTemplates}
        onCellsChanged={handleChanges}
        onContextMenu={handleContextMenu}
        enableRowSelection
        enableRangeSelection
        enableFillHandle
      />
    </>
  );
};

export default CustomTable;
