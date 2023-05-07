export default "attribute float displacement;\n      uniform vec3 vLut[256];\n      varying vec3 vColor;\n\n      void main()\n      {\n        int index = int(displacement);\n        vColor = vLut[index];\n        vec3 newPosition = position + normal*displacement/25.5;\n        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);\n      }\n";
//# sourceMappingURL=ColorVS.js.map