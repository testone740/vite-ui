/* eslint-disable import/prefer-default-export */
import React from 'react';
import { getCellProperty } from '@silevis/reactgrid';
import AddIcon from '@mui/icons-material/Add';

// Follow the CellTemplate interface document to create your own cell template.
// https://reactgrid.com/docs/4.0/7-api/0-interfaces/5-cell-template/

export class AddCellTemplate {
  // eslint-disable-next-line no-unused-vars
  isFocusable = (cell) => false;

  // eslint-disable-next-line class-methods-use-this
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const onClick = getCellProperty(uncertainCell, 'onClick', 'function');
    const value = parseFloat(text);
    return { ...uncertainCell, text, value, onClick };
  }

  render(cell) {
    return <AddIcon onClick={cell.onClick} size="large" />;
  }
}
