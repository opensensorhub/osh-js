function osh_extend(child, parent) {
  child.prototype = osh_inherit(parent.prototype);
  child.prototype.constructor = child;
  child.parent = parent.prototype;
};

function osh_inherit(proto) {
  function f() {}
  f.prototype = proto;
  return new f();
};
