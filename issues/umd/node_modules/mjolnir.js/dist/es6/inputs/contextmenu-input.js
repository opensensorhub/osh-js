const EVENT_TYPE = 'contextmenu';
export default class ContextmenuInput {
  constructor(element, callback, options = {}) {
    this.element = element;
    this.callback = callback;
    this.options = Object.assign({
      enable: true
    }, options);
    this.handleEvent = this.handleEvent.bind(this);
    element.addEventListener('contextmenu', this.handleEvent);
  }

  destroy() {
    this.element.removeEventListener('contextmenu', this.handleEvent);
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

    this.callback({
      type: EVENT_TYPE,
      center: {
        x: event.clientX,
        y: event.clientY
      },
      srcEvent: event,
      pointerType: 'mouse',
      target: event.target
    });
  }

}
//# sourceMappingURL=contextmenu-input.js.map