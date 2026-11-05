if (!Object.prototype.hasOwnProperty.call(globalThis, 'window')) {
    globalThis.window = globalThis;
}
