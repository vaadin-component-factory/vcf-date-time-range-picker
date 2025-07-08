import { TextField } from '@vaadin/text-field';
import { registerStyles, css } from '@vaadin/vaadin-themable-mixin/register-styles.js';

registerStyles(
  'vcf-date-time-range-picker-text-field',
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
      :host([dir="rtl"]) [part="input-field"] ::slotted(input):-ms-input-placeholder {
        direction: rtl;
        text-align: left;
      }

      :host(.endDate) [part="input-field"] {
        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      :host(.startDate) [part="input-field"] {
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }

      ::slotted(input) {
        --_lumo-text-field-overflow-mask-image: none;
      }
      
      `,
  { moduleId: 'vcf-date-time-range-picker-text-field-styles' }
);

/**
 * An element used internally by `<vcf-date-time-range-picker>`. Not intended to be used separately.
 *
 * @extends TextField
 * @private
 */
class DateTimeRangePickerTextFieldElement extends TextField {
  static get is() {
    return 'vcf-date-time-range-picker-text-field';
  }
  
  __clear() {
    this.clear();
    const inputEvent = new Event('input', { bubbles: true, composed: true });
    inputEvent.__fromClearButton = true;
    const changeEvent = new Event('change', { bubbles: true });
    changeEvent.__fromClearButton = true;
    this.inputElement.dispatchEvent(inputEvent);
    this.inputElement.dispatchEvent(changeEvent);
  }
}

customElements.define(DateTimeRangePickerTextFieldElement.is, DateTimeRangePickerTextFieldElement);

