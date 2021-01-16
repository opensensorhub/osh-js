import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { getDeckInstance, addLayer, removeLayer, updateLayer, drawLayer } from './deck-utils';

var MapboxLayer = function () {
  function MapboxLayer(props) {
    _classCallCheck(this, MapboxLayer);

    if (!props.id) {
      throw new Error('Layer must have an unique id');
    }

    this.id = props.id;
    this.type = 'custom';
    this.renderingMode = props.renderingMode || '3d';
    this.map = null;
    this.deck = null;
    this.props = props;
  }

  _createClass(MapboxLayer, [{
    key: "onAdd",
    value: function onAdd(map, gl) {
      this.map = map;
      this.deck = getDeckInstance({
        map: map,
        gl: gl,
        deck: this.props.deck
      });
      addLayer(this.deck, this);
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      removeLayer(this.deck, this);
    }
  }, {
    key: "setProps",
    value: function setProps(props) {
      Object.assign(this.props, props, {
        id: this.id
      });

      if (this.deck) {
        updateLayer(this.deck, this);
      }
    }
  }, {
    key: "render",
    value: function render(gl, matrix) {
      drawLayer(this.deck, this.map, this);
    }
  }]);

  return MapboxLayer;
}();

export { MapboxLayer as default };
//# sourceMappingURL=mapbox-layer.js.map