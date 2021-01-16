import { INPUT_EVENT_TYPES } from '../constants';
const {
  KEY_EVENTS
} = INPUT_EVENT_TYPES;
const DOWN_EVENT_TYPE = 'keydown';
const UP_EVENT_TYPE = 'keyup';
export default class KeyInput {
  constructor(element, callback, options = {}) {
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableDownEvent = this.options.enable;
    this.enableUpEvent = this.options.enable;
    this.events = KEY_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    element.tabIndex = options.tabIndex || 0;
    element.style.outline = 'none';
    this.events.forEach(event => element.addEventListener(event, this.handleEvent));
  }

  destroy() {
    this.events.forEach(event => this.element.removeEventListener(event, this.handleEvent));
  }

  enableEventType(eventType, enabled) {
    if (eventType === DOWN_EVENT_TYPE) {
      this.enableDownEvent = enabled;
    }

    if (eventType === UP_EVENT_TYPE) {
      this.enableUpEvent = enabled;
    }
  }

  handleEvent(event) {
    const targetElement = event.target || event.srcElement;

    if (targetElement.tagName === 'INPUT' && targetElement.type === 'text' || targetElement.tagName === 'TEXTAREA') {
      return;
    }

    if (this.enableDownEvent && event.type === 'keydown') {
      this.callback({
        type: DOWN_EVENT_TYPE,
        srcEvent: event,
        key: event.key,
        target: event.target
      });
    }

    if (this.enableUpEvent && event.type === 'keyup') {
      this.callback({
        type: UP_EVENT_TYPE,
        srcEvent: event,
        key: event.key,
        target: event.target
      });
    }
  }

}
//# sourceMappingURL=key-input.js.map