"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whichButtons = whichButtons;
exports.getOffsetPosition = getOffsetPosition;
var DOWN_EVENT = 1;
var MOVE_EVENT = 2;
var UP_EVENT = 4;
var MOUSE_EVENTS = {
  pointerdown: DOWN_EVENT,
  pointermove: MOVE_EVENT,
  pointerup: UP_EVENT,
  mousedown: DOWN_EVENT,
  mousemove: MOVE_EVENT,
  mouseup: UP_EVENT
};
var MOUSE_EVENT_WHICH_LEFT = 1;
var MOUSE_EVENT_WHICH_MIDDLE = 2;
var MOUSE_EVENT_WHICH_RIGHT = 3;
var MOUSE_EVENT_BUTTON_LEFT = 0;
var MOUSE_EVENT_BUTTON_MIDDLE = 1;
var MOUSE_EVENT_BUTTON_RIGHT = 2;
var MOUSE_EVENT_BUTTONS_LEFT_MASK = 1;
var MOUSE_EVENT_BUTTONS_RIGHT_MASK = 2;
var MOUSE_EVENT_BUTTONS_MIDDLE_MASK = 4;

function whichButtons(event) {
  var eventType = MOUSE_EVENTS[event.srcEvent.type];

  if (!eventType) {
    return null;
  }

  var _event$srcEvent = event.srcEvent,
      buttons = _event$srcEvent.buttons,
      button = _event$srcEvent.button,
      which = _event$srcEvent.which;
  var leftButton = false;
  var middleButton = false;
  var rightButton = false;

  if (eventType === UP_EVENT || eventType === MOVE_EVENT && !Number.isFinite(buttons)) {
    leftButton = which === MOUSE_EVENT_WHICH_LEFT;
    middleButton = which === MOUSE_EVENT_WHICH_MIDDLE;
    rightButton = which === MOUSE_EVENT_WHICH_RIGHT;
  } else if (eventType === MOVE_EVENT) {
    leftButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_LEFT_MASK);
    middleButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_MIDDLE_MASK);
    rightButton = Boolean(buttons & MOUSE_EVENT_BUTTONS_RIGHT_MASK);
  } else if (eventType === DOWN_EVENT) {
    leftButton = button === MOUSE_EVENT_BUTTON_LEFT;
    middleButton = button === MOUSE_EVENT_BUTTON_MIDDLE;
    rightButton = button === MOUSE_EVENT_BUTTON_RIGHT;
  }

  return {
    leftButton: leftButton,
    middleButton: middleButton,
    rightButton: rightButton
  };
}

function getOffsetPosition(event, rootElement) {
  var srcEvent = event.srcEvent;

  if (!event.center && !Number.isFinite(srcEvent.clientX)) {
    return null;
  }

  var center = event.center || {
    x: srcEvent.clientX,
    y: srcEvent.clientY
  };
  var rect = rootElement.getBoundingClientRect();
  var scaleX = rect.width / rootElement.offsetWidth;
  var scaleY = rect.height / rootElement.offsetHeight;
  var offsetCenter = {
    x: (center.x - rect.left - rootElement.clientLeft) / scaleX,
    y: (center.y - rect.top - rootElement.clientTop) / scaleY
  };
  return {
    center: center,
    offsetCenter: offsetCenter
  };
}
//# sourceMappingURL=event-utils.js.map