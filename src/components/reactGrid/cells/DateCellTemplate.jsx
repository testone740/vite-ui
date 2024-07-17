/* eslint-disable import/prefer-default-export */
import React from 'react';
import _ from 'lodash';
import {
  getCellProperty,
  keyCodes,
  inNumericKey,
  isNavigationKey,
  isCharAlphaNumeric,
  getCharFromKey,
} from '@silevis/reactgrid';

const getFormattedTimeUnit = (timeUnit) => timeUnit.toString().padStart(2, '0');

// Follow the CellTemplate interface document to create your own cell template.
// https://reactgrid.com/docs/4.0/7-api/0-interfaces/5-cell-template/

// Create a custom DateCellTemplate to fix the field value not getting cleared when users clear the calendar
// When users click 'clear' button on the calendar and hit enter, the cell value should be set to empty or null, but it doesn't not.
export class DateCellTemplate {
  wasEscKeyPressed = false;

  // eslint-disable-next-line class-methods-use-this
  getCompatibleCell(uncertainCell) {
    // console.log('uncertainCell', uncertainCell);
    const date = uncertainCell.date
      ? getCellProperty(uncertainCell, 'date', 'object')
      : new Date(NaN);
    const dateFormat =
      uncertainCell.format ||
      new Intl.DateTimeFormat(window.navigator.language);
    const value = date.getTime();
    const text = !Number.isNaN(value) ? dateFormat.format(date) : '';
    return { ...uncertainCell, date, value, text };
  }

  // eslint-disable-next-line no-unused-vars
  handleKeyDown(cell, keyCode, ctrl, shift, alt, key, capsLock) {
    if (!ctrl && isCharAlphaNumeric(getCharFromKey(key))) {
      return {
        cell: this.getCompatibleCell({ ...cell }),
        enableEditMode: true,
      };
    }
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  update(cell, cellToMerge) {
    // console.log('cellToMerge', cellToMerge);

    return this.getCompatibleCell({
      ...cell,
      date: new Date(cellToMerge.text),
      text: cellToMerge.text,
    });
  }

  // eslint-disable-next-line no-unused-vars, class-methods-use-this
  getClassName(cell, isInEditMode) {
    return cell.className ? cell.className : '';
  }

  render(cell, isInEditMode, onCellChanged) {
    if (!isInEditMode) {
      return cell.text;
    }

    if (!cell.date) {
      return `"cell.date" is not initialized with a date value`;
    }

    const yearx = getFormattedTimeUnit(cell.date.getFullYear());
    const monthx = getFormattedTimeUnit(cell.date.getMonth() + 1);
    const dayx = getFormattedTimeUnit(cell.date.getDate());

    return (
      <input
        className="rg-input"
        ref={(input) => {
          if (input) input.focus();
        }}
        type="date"
        defaultValue={`${yearx}-${monthx}-${dayx}`}
        onChange={(e) => {
          if (e.currentTarget.value) {
            const [year, month, day] = e.currentTarget.value
              .split('-')
              .map((v) => parseInt(v, 10));
            onCellChanged(
              this.getCompatibleCell({
                ...cell,
                date: new Date(year, month - 1, day),
              }),
              false
            );
          } else {
            // fix the clear calendar issue here
            _.set(cell, 'date', new Date(NaN));
            onCellChanged(this.getCompatibleCell(cell), true);
          }
        }}
        onBlur={(e) => {
          if (e.currentTarget.value) {
            const [year, month, day] = e.currentTarget.value
              .split('-')
              .map((v) => parseInt(v, 10));
            onCellChanged(
              this.getCompatibleCell({
                ...cell,
                date: new Date(year, month - 1, day),
              }),
              !this.wasEscKeyPressed
            );
            this.wasEscKeyPressed = false;
          }
        }}
        onKeyDown={(e) => {
          if (
            inNumericKey(e.keyCode) ||
            isNavigationKey(e.keyCode) ||
            e.keyCode === keyCodes.COMMA ||
            e.keyCode === keyCodes.PERIOD ||
            ((e.ctrlKey || e.metaKey) && e.keyCode === keyCodes.KEY_A)
          )
            e.stopPropagation();
          if (
            !inNumericKey(e.keyCode) &&
            !isNavigationKey(e.keyCode) &&
            e.keyCode !== keyCodes.COMMA &&
            e.keyCode !== keyCodes.PERIOD
          )
            e.preventDefault();
          if (e.keyCode === keyCodes.ESCAPE) this.wasEscKeyPressed = true;
        }}
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
      />
    );
  }
}
