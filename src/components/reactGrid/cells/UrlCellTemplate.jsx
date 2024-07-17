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

export class UrlCellTemplate {
  // eslint-disable-next-line class-methods-use-this
  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    let placeholder;
    try {
      placeholder = getCellProperty(uncertainCell, 'placeholder', 'string');
    } catch {
      placeholder = '';
    }
    const value = parseFloat(text);
    return { ...uncertainCell, text, value, placeholder };
  }

  render(cell, isInEditMode, onCellChanged) {
    if (!isInEditMode) {
      return (
        <>
          <a
            href={cell.text}
            target="_blank"
            className="text-primary underline"
            rel="noreferrer"
          >
            {cell.text}
          </a>
        </>
      );
    }
    return (
      <input
        ref={(input) => {
          // eslint-disable-next-line no-unused-expressions
          input && input.focus();
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false
          )
        }
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder={cell.placeholder}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
        }}
      />
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
    return this.getCompatibleCell({
      ...cell,
      text: cellToMerge.text,
      placeholder: cellToMerge.placeholder,
    });
  }
}
