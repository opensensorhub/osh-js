import { getDeckInstance, addLayer, removeLayer, updateLayer, drawLayer } from './deck-utils';
export default class MapboxLayer {
  constructor(props) {
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

  onAdd(map, gl) {
    this.map = map;
    this.deck = getDeckInstance({
      map,
      gl,
      deck: this.props.deck
    });
    addLayer(this.deck, this);
  }

  onRemove() {
    removeLayer(this.deck, this);
  }

  setProps(props) {
    Object.assign(this.props, props, {
      id: this.id
    });

    if (this.deck) {
      updateLayer(this.deck, this);
    }
  }

  render(gl, matrix) {
    drawLayer(this.deck, this.map, this);
  }

}
//# sourceMappingURL=mapbox-layer.js.map