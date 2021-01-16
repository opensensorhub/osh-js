import { makeStringIterator } from './string-iterator';
import { makeArrayBufferIterator } from './array-buffer-iterator';
import { makeBlobIterator } from './blob-iterator';
import { assert } from '@loaders.gl/loader-utils';
import { makeStreamIterator } from './stream-iterator';
import { isBlob, isReadableStream, isResponse } from '../../javascript-utils/is-type';
export function makeIterator(data, options = {}) {
  if (typeof data === 'string') {
    return makeStringIterator(data, options);
  }

  if (data instanceof ArrayBuffer) {
    return makeArrayBufferIterator(data, options);
  }

  if (isBlob(data)) {
    return makeBlobIterator(data, options);
  }

  if (isReadableStream(data)) {
    return makeStreamIterator(data);
  }

  if (isResponse(data)) {
    return makeStreamIterator(data.body);
  }

  return assert(false);
}
//# sourceMappingURL=make-iterator.js.map