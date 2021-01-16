export const userAgent = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent.toLowerCase() : '';
const window_ = typeof window !== 'undefined' ? window : global;
const global_ = typeof global !== 'undefined' ? global : window;
const document_ = typeof document !== 'undefined' ? document : {};
export { window_ as window, global_ as global, document_ as document };
let passiveSupported = false;

try {
  const options = {
    get passive() {
      passiveSupported = true;
      return true;
    }

  };
  window_.addEventListener('test', options, options);
  window_.removeEventListener('test', options, options);
} catch (err) {}

export { passiveSupported };
//# sourceMappingURL=globals.js.map