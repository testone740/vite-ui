import React from 'react';
import { ReactGrid } from '@silevis/reactgrid';
import '@silevis/reactgrid/styles.css';

const departmentOptions = ['HR', 'Sales', 'Marketing', 'Finance', 'IT'];

const getDepartments = () => {
  const data = [
    { name: 'HR' },
    { name: 'Finance' },
    { name: 'IT' },
    { name: '' },
  ];
  return data;
};

const getColumns = () => [{ columnId: 'department', width: 150 }];

const headerRow = {
  rowId: 'header',
  cells: [{ type: 'header', text: 'Department' }],
};

const getRows = (departments) => {
  // console.log('departments', departments);
  return [
    headerRow,
    ...departments.map((department, idx) => {
      return {
        rowId: idx,
        cells: [
          {
            type: 'dropdown',
            values: departmentOptions.map((department) => ({
              value: department,
              label: department,
            })),
            isOpen: department.isOpen,
            // currentValue: 'finance',
            selectedValue: department.name,
          },
        ],
      };
    }),
  ];
};

const applyChangesToDepartments = (changes, prevDepartments) => {
  console.log('changes', changes);
  // console.log('prevDepartments', prevDepartments);
  changes.forEach((change) => {
    if (change.type === 'dropdown' && change.columnId === 'department') {
      const departmentIndex = change.rowId;
      prevDepartments[departmentIndex].isOpen = change.newCell.isOpen;

      if (
        change.newCell.selectedValue &&
        change.newCell.selectedValue !== change.previousCell.selectedValue
      ) {
        prevDepartments[departmentIndex].name = change.newCell.selectedValue;
      }
    }
  });
  return [...prevDepartments];
};

function App() {
  const [departments, setDepartments] = React.useState(getDepartments());
  const rows = getRows(departments);
  const columns = getColumns();

  const handleChanges = (changes) => {
    console.log('changes: ', changes);
    setDepartments((prevDepartments) =>
      applyChangesToDepartments(changes, prevDepartments)
    );
  };

  return (
    <ReactGrid
      onCellsChanged={handleChanges}
      rows={rows}
      columns={columns}
      enableFillHandle
      enableRangeSelection
    />
  );
}

export default App;
