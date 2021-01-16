import { isBrowser, resolvePath } from '@loaders.gl/loader-utils';
import * as node from '../../node/read-file-sync.node';
import { readFileSyncBrowser } from './read-file.browser';
export function readFileSync(url, options = {}) {
  url = resolvePath(url);

  if (!isBrowser && node.readFileSync) {
    return node.readFileSync(url, options);
  }

  return readFileSyncBrowser(url, options);
}
//# sourceMappingURL=read-file.js.map