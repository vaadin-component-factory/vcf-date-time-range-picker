import { Overlay } from '@vaadin/overlay/src/vaadin-overlay.js';
import { PositionMixin } from '@vaadin/overlay/src/vaadin-overlay-position-mixin.js';
import './vcf-date-time-range-picker-overlay-content.js';

/**
 * The overlay element.
 *
 * ### Styling
 *
 * See [`<vaadin-overlay>` documentation](https://github.com/vaadin/vaadin-overlay/blob/master/src/vaadin-overlay.html)
 * for `<vcf-date-time-range-picker-overlay>` parts.
 *
 * See [ThemableMixin – how to apply styles for shadow parts](https://github.com/vaadin/vaadin-themable-mixin/wiki)
 *
 * @extends Vaadin.Overlay
 * @memberof Vaadin
 * @private
 */
class DateTimeRangePickerOverlayElement extends PositionMixin(Overlay) {
  static get is() {
    return 'vcf-date-time-range-picker-overlay';
  }

}

customElements.define(DateTimeRangePickerOverlayElement.is, DateTimeRangePickerOverlayElement);
