import { useState } from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

const getPeople = () => [
  { id: 11, fName: 'Thomas', lName: 'Brown', bDate: new Date('01/01/2000') },
  { id: 12, fName: 'Susie', lName: 'Lane', bDate: new Date('12-15-2001') },
  { id: 13, fName: 'John', lName: 'Doe', bDate: '' },
  { id: '', fName: '', lName: '', bDate: '' },
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

const getRows = (people) => [
  headerRow,
  ...people.map((person, idx) => ({
    rowId: idx,
    cells: [
      { type: 'number', value: person.id },
      { type: 'text', text: person.fName },
      { type: 'text', text: person.lName },
      { type: 'date', date: person.bDate },
    ],
  })),
];

const applyChangesToPeople = (changes, prevPeople) => {
  // console.log('changes', changes);

  changes.forEach((change) => {
    const rowId = change.rowId;
    const columnId = change.columnId;

    if (change.newCell.type === 'number') {
      prevPeople[rowId][columnId] = change.newCell.value;
    }
    if (change.newCell.type === 'text') {
      prevPeople[rowId][columnId] = change.newCell.text;
    }
    if (change.newCell.type === 'date') {
      prevPeople[rowId][columnId] = new Date(change.newCell.value);
    }
  });

  return [...prevPeople];
};

const BasicReactGrid = () => {
  const [people, setPeople] = useState(getPeople());
  const [columns] = useState(getColumns());

  const rows = getRows(people);

  const handleChanges = (changes) => {
    setPeople((prevPeople) => applyChangesToPeople(changes, prevPeople));
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
    <ReactGrid
      columns={columns}
      rows={rows}
      onCellsChanged={handleChanges}
      onContextMenu={handleContextMenu}
      enableRowSelection
      enableRangeSelection
    />
  );
};

export default BasicReactGrid;
