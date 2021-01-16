import { isBrowser, resolvePath } from '@loaders.gl/loader-utils';
import * as node from '../../node/read-file-sync.node';
import { readFileSyncBrowser } from './read-file.browser';
export function readFileSync(url) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  url = resolvePath(url);

  if (!isBrowser && node.readFileSync) {
    return node.readFileSync(url, options);
  }

  return readFileSyncBrowser(url, options);
}
//# sourceMappingURL=read-file.js.map