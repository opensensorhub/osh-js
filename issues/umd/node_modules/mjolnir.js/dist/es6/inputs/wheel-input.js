import { INPUT_EVENT_TYPES } from '../constants';
import { window, userAgent, passiveSupported } from '../utils/globals';
const firefox = userAgent.indexOf('firefox') !== -1;
const {
  WHEEL_EVENTS
} = INPUT_EVENT_TYPES;
const EVENT_TYPE = 'wheel';
const WHEEL_DELTA_MAGIC_SCALER = 4.000244140625;
const WHEEL_DELTA_PER_LINE = 40;
const SHIFT_MULTIPLIER = 0.25;
export default class WheelInput {
  constructor(element, callback, options = {}) {
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.events = WHEEL_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(event => element.addEventListener(event, this.handleEvent, passiveSupported ? {
      passive: false
    } : false));
  }

  destroy() {
    this.events.forEach(event => this.element.removeEventListener(event, this.handleEvent));
  }

  enableEventType(eventType, enabled) {
    if (eventType === EVENT_TYPE) {
      this.options.enable = enabled;
    }
  }

  handleEvent(event) {
    if (!this.options.enable) {
      return;
    }

    let value = event.deltaY;

    if (window.WheelEvent) {
      if (firefox && event.deltaMode === window.WheelEvent.DOM_DELTA_PIXEL) {
        value /= window.devicePixelRatio;
      }

      if (event.deltaMode === window.WheelEvent.DOM_DELTA_LINE) {
        value *= WHEEL_DELTA_PER_LINE;
      }
    }

    const wheelPosition = {
      x: event.clientX,
      y: event.clientY
    };

    if (value !== 0 && value % WHEEL_DELTA_MAGIC_SCALER === 0) {
      value = Math.floor(value / WHEEL_DELTA_MAGIC_SCALER);
    }

    if (event.shiftKey && value) {
      value = value * SHIFT_MULTIPLIER;
    }

    this._onWheel(event, -value, wheelPosition);
  }

  _onWheel(srcEvent, delta, position) {
    this.callback({
      type: EVENT_TYPE,
      center: position,
      delta,
      srcEvent,
      pointerType: 'mouse',
      target: srcEvent.target
    });
  }

}
//# sourceMappingURL=wheel-input.js.map