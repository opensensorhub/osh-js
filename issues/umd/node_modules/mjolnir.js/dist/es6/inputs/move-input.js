import { INPUT_EVENT_TYPES } from '../constants';
const {
  MOUSE_EVENTS
} = INPUT_EVENT_TYPES;
const MOVE_EVENT_TYPE = 'pointermove';
const OVER_EVENT_TYPE = 'pointerover';
const OUT_EVENT_TYPE = 'pointerout';
const LEAVE_EVENT_TYPE = 'pointerleave';
export default class MoveInput {
  constructor(element, callback, options = {}) {
    this.element = element;
    this.callback = callback;
    this.pressed = false;
    this.options = Object.assign({
      enable: true
    }, options);
    this.enableMoveEvent = this.options.enable;
    this.enableLeaveEvent = this.options.enable;
    this.enableOutEvent = this.options.enable;
    this.enableOverEvent = this.options.enable;
    this.events = MOUSE_EVENTS.concat(options.events || []);
    this.handleEvent = this.handleEvent.bind(this);
    this.events.forEach(event => element.addEventListener(event, this.handleEvent));
  }

  destroy() {
    this.events.forEach(event => this.element.removeEventListener(event, this.handleEvent));
  }

  enableEventType(eventType, enabled) {
    if (eventType === MOVE_EVENT_TYPE) {
      this.enableMoveEvent = enabled;
    }

    if (eventType === OVER_EVENT_TYPE) {
      this.enableOverEvent = enabled;
    }

    if (eventType === OUT_EVENT_TYPE) {
      this.enableOutEvent = enabled;
    }

    if (eventType === LEAVE_EVENT_TYPE) {
      this.enableLeaveEvent = enabled;
    }
  }

  handleEvent(event) {
    this.handleOverEvent(event);
    this.handleOutEvent(event);
    this.handleLeaveEvent(event);
    this.handleMoveEvent(event);
  }

  handleOverEvent(event) {
    if (this.enableOverEvent) {
      if (event.type === 'mouseover') {
        this.callback({
          type: OVER_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  }

  handleOutEvent(event) {
    if (this.enableOutEvent) {
      if (event.type === 'mouseout') {
        this.callback({
          type: OUT_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  }

  handleLeaveEvent(event) {
    if (this.enableLeaveEvent) {
      if (event.type === 'mouseleave') {
        this.callback({
          type: LEAVE_EVENT_TYPE,
          srcEvent: event,
          pointerType: 'mouse',
          target: event.target
        });
      }
    }
  }

  handleMoveEvent(event) {
    if (this.enableMoveEvent) {
      switch (event.type) {
        case 'mousedown':
          if (event.button >= 0) {
            this.pressed = true;
          }

          break;

        case 'mousemove':
          if (event.which === 0) {
            this.pressed = false;
          }

          if (!this.pressed) {
            this.callback({
              type: MOVE_EVENT_TYPE,
              srcEvent: event,
              pointerType: 'mouse',
              target: event.target
            });
          }

          break;

        case 'mouseup':
          this.pressed = false;
          break;

        default:
      }
    }
  }

}
//# sourceMappingURL=move-input.js.map