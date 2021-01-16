import { Manager } from './utils/hammer';
import WheelInput from './inputs/wheel-input';
import MoveInput from './inputs/move-input';
import KeyInput from './inputs/key-input';
import ContextmenuInput from './inputs/contextmenu-input';
import EventRegistrar from './utils/event-registrar';
import { BASIC_EVENT_ALIASES, EVENT_RECOGNIZER_MAP, GESTURE_EVENT_ALIASES, RECOGNIZERS, RECOGNIZER_COMPATIBLE_MAP, RECOGNIZER_FALLBACK_MAP } from './constants';
const DEFAULT_OPTIONS = {
  events: null,
  recognizers: null,
  recognizerOptions: {},
  Manager,
  touchAction: 'none',
  tabIndex: 0
};
export default class EventManager {
  constructor(element = null, options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this.events = new Map();
    this._onBasicInput = this._onBasicInput.bind(this);
    this._onOtherEvent = this._onOtherEvent.bind(this);
    this.setElement(element);
    const {
      events
    } = options;

    if (events) {
      this.on(events);
    }
  }

  setElement(element) {
    if (this.element) {
      this.destroy();
    }

    this.element = element;

    if (!element) {
      return;
    }

    const {
      options
    } = this;
    const ManagerClass = options.Manager;
    this.manager = new ManagerClass(element, {
      touchAction: options.touchAction,
      recognizers: options.recognizers || RECOGNIZERS
    }).on('hammer.input', this._onBasicInput);

    if (!options.recognizers) {
      Object.keys(RECOGNIZER_COMPATIBLE_MAP).forEach(name => {
        const recognizer = this.manager.get(name);

        if (recognizer) {
          RECOGNIZER_COMPATIBLE_MAP[name].forEach(otherName => {
            recognizer.recognizeWith(otherName);
          });
        }
      });
    }

    for (const recognizerName in options.recognizerOptions) {
      const recognizer = this.manager.get(recognizerName);

      if (recognizer) {
        const recognizerOption = options.recognizerOptions[recognizerName];
        delete recognizerOption.enable;
        recognizer.set(recognizerOption);
      }
    }

    this.wheelInput = new WheelInput(element, this._onOtherEvent, {
      enable: false
    });
    this.moveInput = new MoveInput(element, this._onOtherEvent, {
      enable: false
    });
    this.keyInput = new KeyInput(element, this._onOtherEvent, {
      enable: false,
      tabIndex: options.tabIndex
    });
    this.contextmenuInput = new ContextmenuInput(element, this._onOtherEvent, {
      enable: false
    });

    for (const [eventAlias, eventRegistrar] of this.events) {
      if (!eventRegistrar.isEmpty()) {
        this._toggleRecognizer(eventRegistrar.recognizerName, true);

        this.manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }
  }

  destroy() {
    if (this.element) {
      this.wheelInput.destroy();
      this.moveInput.destroy();
      this.keyInput.destroy();
      this.contextmenuInput.destroy();
      this.manager.destroy();
      this.wheelInput = null;
      this.moveInput = null;
      this.keyInput = null;
      this.contextmenuInput = null;
      this.manager = null;
      this.element = null;
    }
  }

  on(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false);
  }

  once(event, handler, opts) {
    this._addEventHandler(event, handler, opts, true);
  }

  watch(event, handler, opts) {
    this._addEventHandler(event, handler, opts, false, true);
  }

  off(event, handler) {
    this._removeEventHandler(event, handler);
  }

  _toggleRecognizer(name, enabled) {
    const {
      manager
    } = this;

    if (!manager) {
      return;
    }

    const recognizer = manager.get(name);

    if (recognizer && recognizer.options.enable !== enabled) {
      recognizer.set({
        enable: enabled
      });
      const fallbackRecognizers = RECOGNIZER_FALLBACK_MAP[name];

      if (fallbackRecognizers && !this.options.recognizers) {
        fallbackRecognizers.forEach(otherName => {
          const otherRecognizer = manager.get(otherName);

          if (enabled) {
            otherRecognizer.requireFailure(name);
            recognizer.dropRequireFailure(otherName);
          } else {
            otherRecognizer.dropRequireFailure(name);
          }
        });
      }
    }

    this.wheelInput.enableEventType(name, enabled);
    this.moveInput.enableEventType(name, enabled);
    this.keyInput.enableEventType(name, enabled);
    this.contextmenuInput.enableEventType(name, enabled);
  }

  _addEventHandler(event, handler, opts, once, passive) {
    if (typeof event !== 'string') {
      opts = handler;

      for (const eventName in event) {
        this._addEventHandler(eventName, event[eventName], opts, once, passive);
      }

      return;
    }

    const {
      manager,
      events
    } = this;
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    let eventRegistrar = events.get(eventAlias);

    if (!eventRegistrar) {
      eventRegistrar = new EventRegistrar(this);
      events.set(eventAlias, eventRegistrar);
      eventRegistrar.recognizerName = EVENT_RECOGNIZER_MAP[eventAlias] || eventAlias;

      if (manager) {
        manager.on(eventAlias, eventRegistrar.handleEvent);
      }
    }

    eventRegistrar.add(event, handler, opts, once, passive);

    if (!eventRegistrar.isEmpty()) {
      this._toggleRecognizer(eventRegistrar.recognizerName, true);
    }
  }

  _removeEventHandler(event, handler) {
    if (typeof event !== 'string') {
      for (const eventName in event) {
        this._removeEventHandler(eventName, event[eventName]);
      }

      return;
    }

    const {
      events
    } = this;
    const eventAlias = GESTURE_EVENT_ALIASES[event] || event;
    const eventRegistrar = events.get(eventAlias);

    if (!eventRegistrar) {
      return;
    }

    eventRegistrar.remove(event, handler);

    if (eventRegistrar.isEmpty()) {
      const {
        recognizerName
      } = eventRegistrar;
      let isRecognizerUsed = false;

      for (const eh of events.values()) {
        if (eh.recognizerName === recognizerName && !eh.isEmpty()) {
          isRecognizerUsed = true;
          break;
        }
      }

      if (!isRecognizerUsed) {
        this._toggleRecognizer(recognizerName, false);
      }
    }
  }

  _onBasicInput(event) {
    const {
      srcEvent
    } = event;
    const alias = BASIC_EVENT_ALIASES[srcEvent.type];

    if (alias) {
      this.manager.emit(alias, event);
    }
  }

  _onOtherEvent(event) {
    this.manager.emit(event.type, event);
  }

}
//# sourceMappingURL=event-manager.js.map