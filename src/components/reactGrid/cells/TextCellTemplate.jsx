import React from 'react';
import {
  getCellProperty,
  getCharFromKey,
  isAlphaNumericKey,
  keyCodes,
} from '@silevis/reactgrid';

export class TextCellTemplate {
  wasEscKeyPressed = false;

  getCompatibleCell(uncertainCell) {
    const text = getCellProperty(uncertainCell, 'text', 'string');
    let placeholder;
    try {
      placeholder = getCellProperty(uncertainCell, 'placeholder', 'string');
    } catch {
      placeholder = '';
    }
    const value = parseFloat(text); // TODO more advanced parsing for all text based cells
    return { ...uncertainCell, text, value, placeholder };
  }

  update(cell, cellToMerge) {
    return this.getCompatibleCell({
      ...cell,
      text: cellToMerge.text,
      placeholder: cellToMerge.placeholder,
    });
  }

  handleKeyDown(cell, keyCode, ctrl, shift, alt, key, capsLock) {
    const char = getCharFromKey(key, shift, capsLock);

    if (
      !ctrl &&
      !alt &&
      isAlphaNumericKey(keyCode) &&
      !(shift && keyCode === keyCodes.SPACE)
    )
      return {
        cell: this.getCompatibleCell({ ...cell, text: char }),
        enableEditMode: true,
      };
    return {
      cell,
      enableEditMode:
        keyCode === keyCodes.POINTER || keyCode === keyCodes.ENTER,
    };
  }

  handleCompositionEnd(cell, eventData) {
    return { cell: { ...cell, text: eventData }, enableEditMode: true };
  }

  getClassName(cell, isInEditMode) {
    const isValid = cell.validator ? cell.validator(cell.text) : true;
    const className = cell.className ? cell.className : '';
    return `${isValid ? 'valid' : 'rg-invalid'} ${
      cell.placeholder && cell.text === '' ? 'placeholder' : ''
    } ${className}`;
  }

  render(cell, isInEditMode, onCellChanged) {
    if (!isInEditMode) {
      const isValid = cell.validator ? cell.validator(cell.text) : true;
      const cellText = cell.text || cell.placeholder || '';
      const textToDisplay =
        !isValid && cell.errorMessage ? cell.errorMessage : cellText;
      return cell.renderer ? cell.renderer(textToDisplay) : textToDisplay;
    }

    return (
      <input
        className="rg-input"
        ref={(input) => {
          if (input) {
            input.focus();
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }}
        defaultValue={cell.text}
        onChange={(e) =>
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            false
          )
        }
        onBlur={(e) => {
          onCellChanged(
            this.getCompatibleCell({ ...cell, text: e.currentTarget.value }),
            !this.wasEscKeyPressed
          );
          this.wasEscKeyPressed = false;
        }}
        onCopy={(e) => e.stopPropagation()}
        onCut={(e) => e.stopPropagation()}
        onPaste={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder={cell.placeholder}
        onKeyDown={(e) => {
          if (isAlphaNumericKey(e.keyCode) || isNavigationKey(e.keyCode))
            e.stopPropagation();
          if (e.keyCode === keyCodes.ESCAPE) this.wasEscKeyPressed = true;
        }}
      />
    );
  }
}
