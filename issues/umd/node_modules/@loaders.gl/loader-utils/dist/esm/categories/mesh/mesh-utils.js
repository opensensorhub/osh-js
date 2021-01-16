export function getMeshSize(attributes) {
  var size = 0;

  for (var attributeName in attributes) {
    var attribute = attributes[attributeName];

    if (ArrayBuffer.isView(attribute)) {
      size += attribute.byteLength * attribute.BYTES_PER_ELEMENT;
    }
  }

  return size;
}
export function getMeshBoundingBox(attributes) {
  if (!attributes || !attributes.POSITION) {
    return null;
  }

  var minX = Infinity;
  var minY = Infinity;
  var minZ = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  var maxZ = -Infinity;
  var positions = attributes.POSITION.value;
  var len = positions && positions.length;

  if (!len) {
    return null;
  }

  for (var i = 0; i < len; i += 3) {
    var x = positions[i];
    var y = positions[i + 1];
    var z = positions[i + 2];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  }

  return [[minX, minY, minZ], [maxX, maxY, maxZ]];
}
//# sourceMappingURL=mesh-utils.js.map