import { TimePicker } from "@vaadin/time-picker";
import {
  registerStyles,
  css,
} from "@vaadin/vaadin-themable-mixin/register-styles.js";

registerStyles(
  "vcf-date-time-range-picker-time-field",
  css`
    :host([dir="rtl"]) [part="input-field"] {
      direction: ltr;
    }

    :host([dir="rtl"]) [part="value"]::placeholder {
      direction: rtl;
      text-align: left;
    }

    :host([dir="rtl"]) [part="input-field"] ::slotted(input)::placeholder {
      direction: rtl;
      text-align: left;
    }

    :host([dir="rtl"]) [part="value"]:-ms-input-placeholder,
    :host([dir="rtl"])
      [part="input-field"]
      ::slotted(input):-ms-input-placeholder {
      direction: rtl;
      text-align: left;
    }

    :host(.endTime) [part="toggle-button"] {
      position: absolute;
      right: 6px;
    }

    :host(.startTime) [part="toggle-button"] {
      display: none;
    }

    :host(.endTime) [part="clear-button"] {
      margin-right: 20px;
    }

    :host(.endTime) [part="toggle-button"]::before {
      content: var(--lumo-icons-calendar);
    }

    :host(.startTime) [part="input-field"] {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    :host(.endTime) [part="input-field"] {
      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }

    ::slotted(input) {
      --_lumo-text-field-overflow-mask-image: none;
    }
  `,
  { moduleId: "vcf-date-time-range-picker-time-field-styles" }
);

/**
 * An element used internally by `<vcf-date-time-range-picker>`. Not intended to be used separately.
 *
 * This class extends Vaadin's `TimePicker` with several key customizations:
 * - **Default Properties:** The constructor sets `step` to `1` (for second precision) and `autoOpenDisabled` to `true` by default.
 * - **Keyboard Handling:** The `_onKeyDown` method is overridden to disable the default time-stepping behavior of the Up and Down arrow keys. This allows the parent component to use these keys to open its overlay.
 * - **Custom Formatting:** The `i18n` object is customized to parse and format time in `HH:MM:SS` format.
 *
 * @extends TimePicker
 * @private
 */
class DateTimeRangePickerTimeFieldElement extends TimePicker {
  static get is() {
    return "vcf-date-time-range-picker-time-field";
  }

  constructor() {
    super(); 

    // Set the default step to 1 second for every instance of this component
    this.step = 1;

    // Set auto-open-disabled to true by default
    this.autoOpenDisabled = true;

    // Override the internationalization (i18n) object
    this.i18n = {
      ...this.i18n, // Keep existing i18n settings
      /**
       * Formats a time object into a string with the HH:mm:ss format.
       * @param {Object} time - The time object with hours, minutes, seconds.
       * @returns {string} The formatted time string.
       */
      formatTime: (time) => {
        if (!time) {
          return "";
        }
        const pad = (num) => String(num).padStart(2, "0");
        return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
      },      
      /**
       * Parses a time string from HH:MM or HH:MM:SS format.
       * @param {string} timeString - The time string to parse.
       * @returns {Object|undefined} An object with hours, minutes, and seconds,  
       * or undefined if the input is empty or invalid. 
       * This method expects the time string to be in the format HH:MM or HH:MM:SS.
       * If the input is empty, it returns undefined.
       * If the input is invalid (not in the expected format), it also returns undefined.
       */
      parseTime: (timeString) => {
        if (!timeString) {
          return; // Return undefined for empty input
        }

        const parts = timeString.split(":");

        // Check for the minimum required parts (HH:MM)
        if (parts.length >= 2) {
          const hours = parseInt(parts[0], 10);
          const minutes = parseInt(parts[1], 10);

          // Default seconds to 0 if not provided, otherwise parse them.
          const seconds = parts.length === 3 ? parseInt(parts[2], 10) : 0;

          // Ensure all parsed parts are valid numbers
          if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            return { hours, minutes, seconds };
          }
        }

        // Return undefined if the format is invalid
        return;
      },
    };
  }

  /**
   * Overrides the default keyboard behavior. This prevents the Up and Down arrow
   * keys from incrementing/decrementing the time, allowing the parent
   * component to use those keys to open its overlay.
   * @param {KeyboardEvent} e
   * @protected
   */
  _onKeyDown(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      // 1. Prevent the default time-stepping behavior by doing nothing.
      // 2. Allow the event to bubble up to the parent date-range-picker.
      return;
    }

    // For all other keys (numbers, backspace, tab, etc.),
    // use the default functionality from the parent TimePicker class.
    super._onKeyDown(e);
  }

  /**
   * Overrides the default behavior of the clear button.
   * Instead of clearing the time, it clears the parent date-range-picker.
   * @param {Event} event
   * @protected
   */
  _onClearButtonClick(event) {
    event.preventDefault();
    this.inputElement.focus();
    this.__clear();
  }

  /**
   * Clears the time field and dispatches input and change events.
   * This method is called when the clear button is clicked.
   * It also calls the clear method on the previous sibling element,
   * which is expected to be a date field in the date-time range picker.
   */
  __clear() {
    this.clear();
    const inputEvent = new Event("input", { bubbles: true, composed: true });
    inputEvent.__fromClearButton = true;
    const changeEvent = new Event("change", { bubbles: true });
    changeEvent.__fromClearButton = true;
    this.inputElement.dispatchEvent(inputEvent);
    this.inputElement.dispatchEvent(changeEvent);
    this.previousElementSibling.__clear();
  }
}

customElements.define(
  DateTimeRangePickerTimeFieldElement.is,
  DateTimeRangePickerTimeFieldElement
);
