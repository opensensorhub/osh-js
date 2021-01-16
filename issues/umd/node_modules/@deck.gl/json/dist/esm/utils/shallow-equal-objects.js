import _typeof from "@babel/runtime/helpers/esm/typeof";
export function shallowEqualObjects(a, b) {
  if (a === b) {
    return true;
  }

  if (_typeof(a) !== 'object' || a === null || _typeof(b) !== 'object' || b === null) {
    return false;
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }

  for (var key in a) {
    if (!(key in b) || a[key] !== b[key]) {
      return false;
    }
  }

  for (var _key in b) {
    if (!(_key in a)) {
      return false;
    }
  }

  return true;
}
//# sourceMappingURL=shallow-equal-objects.js.map