"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeStringIterator = makeStringIterator;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _marked = _regenerator["default"].mark(makeStringIterator);

function makeStringIterator(string) {
  var options,
      _options$chunkSize,
      chunkSize,
      offset,
      textEncoder,
      chunkLength,
      chunk,
      _args = arguments;

  return _regenerator["default"].wrap(function makeStringIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _options$chunkSize = options.chunkSize, chunkSize = _options$chunkSize === void 0 ? 256 * 1024 : _options$chunkSize;
          offset = 0;
          textEncoder = new TextEncoder();

        case 4:
          if (!(offset < string.length)) {
            _context.next = 12;
            break;
          }

          chunkLength = Math.min(string.length - offset, chunkSize);
          chunk = string.slice(offset, offset + chunkLength);
          offset += chunkLength;
          _context.next = 10;
          return textEncoder.encode(chunk);

        case 10:
          _context.next = 4;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
//# sourceMappingURL=string-iterator.js.map