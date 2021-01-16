import { getAccessorTypeFromSize, getComponentTypeFromArray } from './gltf-utils';
export function getGLTFAccessors(attributes) {
  var accessors = {};

  for (var name in attributes) {
    var attribute = attributes[name];

    if (name !== 'indices') {
      var glTFAccessor = getGLTFAccessor(attribute);
      accessors[name] = glTFAccessor;
    }
  }

  return accessors;
}
export function getGLTFAccessor(attribute, gltfAttributeName) {
  var _getAccessorData = getAccessorData(attribute, gltfAttributeName),
      buffer = _getAccessorData.buffer,
      size = _getAccessorData.size,
      count = _getAccessorData.count;

  var glTFAccessor = {
    value: buffer,
    size: size,
    bufferView: null,
    byteOffset: 0,
    count: count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  };
  return glTFAccessor;
}
export function getGLTFAttribute(data, gltfAttributeName) {
  return data.attributes[data.glTFAttributeMap[gltfAttributeName]];
}

function getAccessorData(attribute, attributeName) {
  var buffer = attribute;
  var size = 1;
  var count = 0;

  if (attribute && attribute.value) {
    buffer = attribute.value;
    size = attribute.size || 1;
  }

  if (buffer) {
    if (!ArrayBuffer.isView(buffer)) {
      buffer = toTypedArray(buffer, Float32Array);
    }

    count = buffer.length / size;
  }

  return {
    buffer: buffer,
    size: size,
    count: count
  };
}

function toTypedArray(array, ArrayType) {
  var convertTypedArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!array) {
    return null;
  }

  if (Array.isArray(array)) {
    return new ArrayType(array);
  }

  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }

  return array;
}
//# sourceMappingURL=gltf-attribute-utils.js.map