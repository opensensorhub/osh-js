import GLTFInstantiator from './gltf-instantiator';
export default function createGLTFObjects(gl, gltf, options) {
  var instantiator = new GLTFInstantiator(gl, options);
  var scenes = instantiator.instantiate(gltf);
  var animator = instantiator.createAnimator();
  return {
    scenes: scenes,
    animator: animator
  };
}
//# sourceMappingURL=create-gltf-objects.js.map