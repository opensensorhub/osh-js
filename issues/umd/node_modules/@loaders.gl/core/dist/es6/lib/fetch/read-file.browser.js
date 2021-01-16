import { assert } from '@loaders.gl/loader-utils';
const DEFAULT_OPTIONS = {
  dataType: 'arraybuffer',
  nothrow: true
};

const isDataURL = url => url.startsWith('data:');

export function readFileSyncBrowser(uri, options) {
  options = getReadFileOptions(options);

  if (isDataURL(uri)) {}

  if (!options.nothrow) {
    assert(false);
  }

  return null;
}

function getReadFileOptions(options = {}) {
  options = Object.assign({}, DEFAULT_OPTIONS, options);
  options.responseType = options.responseType || options.dataType;
  return options;
}
//# sourceMappingURL=read-file.browser.js.map