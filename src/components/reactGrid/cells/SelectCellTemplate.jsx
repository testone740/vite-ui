/* eslint-disable import/prefer-default-export */
import React from 'react';
import {
  getCellProperty,
  isNavigationKey,
  isAlphaNumericKey,
  keyCodes,
} from '@silevis/reactgrid';

// Follow the CellTemplate interface document to create your own cell template.
// https://reactgrid.com/docs/4.0/7-api/0-interfaces/5-cell-template/

// Create a custom SelectCellTemplate as an alternative of the DropdownCell due to the z-index issue that the
// DropdownCell dropdown menu gets hidden behind the last row
export class SelectCellTemplate {
  // eslint-disable-next-line class-methods-use-this
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    const options = getCellProperty(uncertainCell, 'options', 'object');
    const value = parseFloat(text);
    return { ...uncertainCell, text, value, options };
  }

  render(cell, isInEditMode, onCellChanged) {
    if (!isInEditMode) {
      return (
        <>
          <span className="py-1 px-3 ">{cell.text}</span>
        </>
      );
    }
    return (
      <select
        ref={(input) => {
          // eslint-disable-next-line no-unused-expressions
          input && input.focus();
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(
            this.getCompatibleCell({
              ...cell,
              text:
                e.currentTarget.options[e.currentTarget.selectedIndex].value,
            }),
            false
          )
        }
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
      >
        {cell.options.map((opt, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <option key={idx} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  handleKeyDown(cell, keyCode, ctrl, shift, alt) {
    if (!ctrl && !alt && isAlphaNumericKey(keyCode))
      return { cell, enableEditMode: true };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({ ...cell, text: cellToMerge.text });
  }
}
