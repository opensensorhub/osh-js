function HammerManagerMock(m) {
  const instance = {};

  const chainedNoop = () => instance;

  instance.get = () => null;

  instance.set = chainedNoop;
  instance.on = chainedNoop;
  instance.off = chainedNoop;
  instance.destroy = chainedNoop;
  instance.emit = chainedNoop;
  return instance;
}

export const Manager = HammerManagerMock;
export default null;
//# sourceMappingURL=hammer.js.map