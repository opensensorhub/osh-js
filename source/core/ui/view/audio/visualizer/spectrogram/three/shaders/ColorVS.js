export default `attribute float displacement;
      uniform vec3 vLut[256];
      varying vec3 vColor;

      void main()
      {
        int index = int(displacement);
        vColor = vLut[index];
        vec3 newPosition = position + normal*displacement/25.5;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
      }
`;
