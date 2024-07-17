/* eslint-disable import/prefer-default-export */
import React from 'react';
import { getCellProperty } from '@silevis/reactgrid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Follow the CellTemplate interface document to create your own cell template.
// https://reactgrid.com/docs/4.0/7-api/0-interfaces/5-cell-template/

export class HeaderIconCellTemplate {
  // eslint-disable-next-line no-unused-vars
  isFocusable = (_cell) => false;

  // eslint-disable-next-line class-methods-use-this
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const icon = getCellProperty(uncertainCell, 'icon', 'object');
    const value = parseFloat(text);
    return { ...uncertainCell, text, value, icon };
  }

  render(cell) {
    return (
      <>
        <div className="flex gap-3 items-center grid-header">
          <div>{cell.icon}</div>
          <div>{cell.text}</div>
        </div>
        <ExpandMoreIcon />
      </>
    );
  }
}
