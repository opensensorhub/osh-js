import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import Texture2D from '../classes/texture-2d';
import TextureCube from '../classes/texture-cube';
import Texture3D from '../classes/texture-3d';
import Framebuffer from '../classes/framebuffer';
import { assert } from '../utils';
export function cloneTextureFrom(refTexture, overrides) {
  assert(refTexture instanceof Texture2D || refTexture instanceof TextureCube || refTexture instanceof Texture3D);
  var TextureType = refTexture.constructor;
  var gl = refTexture.gl,
      width = refTexture.width,
      height = refTexture.height,
      format = refTexture.format,
      type = refTexture.type,
      dataFormat = refTexture.dataFormat,
      border = refTexture.border,
      mipmaps = refTexture.mipmaps;
  var textureOptions = Object.assign({
    width: width,
    height: height,
    format: format,
    type: type,
    dataFormat: dataFormat,
    border: border,
    mipmaps: mipmaps
  }, overrides);
  return new TextureType(gl, textureOptions);
}
export function toFramebuffer(texture, opts) {
  var gl = texture.gl,
      width = texture.width,
      height = texture.height,
      id = texture.id;
  var framebuffer = new Framebuffer(gl, Object.assign({}, opts, {
    id: "framebuffer-for-".concat(id),
    width: width,
    height: height,
    attachments: _defineProperty({}, 36064, texture)
  }));
  return framebuffer;
}
//# sourceMappingURL=texture-utils.js.map