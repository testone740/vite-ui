import React from 'react';
import { useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';
import { DateCellTemplate } from './cells/DateCellTemplate';

const getPeople = () => [
  { id: 11, fName: 'Thomas', lName: 'Brown', bDate: new Date('01/01/2000') },
  { id: 12, fName: 'Susie', lName: 'Lane', bDate: new Date('12-15-2001') },
  { id: 13, fName: 'John', lName: 'Doe', bDate: '' },
  { id: '', fName: '12-15-2010', lName: '12/16/2023', bDate: '' },
];

const getColumns = () => [
  { columnId: 'id', width: 100 },
  { columnId: 'fName', width: 150 },
  { columnId: 'lName', width: 150 },
  { columnId: 'bDate', width: 150 },
];

const headerRow = {
  rowId: 'header',
  cells: [
    { type: 'header', text: 'Emp. ID' },
    { type: 'header', text: 'First Name' },
    { type: 'header', text: 'Last Name' },
    { type: 'header', text: 'Birth Date' },
  ],
};

const getRows = (items) => [
  headerRow,
  ...items.map((item, idx) => ({
    rowId: idx,
    cells: [
      { type: 'number', value: item.id },
      { type: 'text', text: item.fName },
      { type: 'text', text: item.lName },
      { type: 'date', date: item.bDate },
    ],
  })),
];

const applyChangesToRows = (changes, prevRows) => {
  // console.log('changes', changes);

  changes.forEach((change) => {
    const rowId = change.rowId;
    const columnId = change.columnId;

    if (change.newCell.type === 'number') {
      prevRows[rowId][columnId] = change.newCell.value;
    }
    if (change.newCell.type === 'text') {
      prevRows[rowId][columnId] = change.newCell.text;
    }
    if (change.newCell.type === 'date') {
      prevRows[rowId][columnId] = new Date(change.newCell.value);
    }
  });

  return [...prevRows];
};

const DateTable = () => {
  const [people, setPeople] = useState(getPeople());
  const [columns] = useState(getColumns());

  const rows = getRows(people);

  const handleChanges = (changes) => {
    setPeople((prevItems) => applyChangesToRows(changes, prevItems));
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
            setPeople((prevPeople) => {
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
      <h3>
        Fix Copy/Paste for Date Cell (copy a date string from clipboard into a
        Date cell)
      </h3>
      <ReactGrid
        columns={columns}
        rows={rows}
        customCellTemplates={{ date: new DateCellTemplate() }}
        onCellsChanged={handleChanges}
        onContextMenu={handleContextMenu}
        enableRowSelection
        enableRangeSelection
      />
    </>
  );
};

export default DateTable;
