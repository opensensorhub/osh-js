import { LayerExtension } from '@deck.gl/core';
import shaderModule from './shader-module';
const defaultProps = {
  getBrushingTarget: {
    type: 'accessor',
    value: [0, 0]
  },
  brushingTarget: 'source',
  brushingEnabled: true,
  brushingRadius: 10000
};
export default class BrushingExtension extends LayerExtension {
  getShaders(extension) {
    return {
      modules: [shaderModule]
    };
  }

  initializeState(context, extension) {
    const attributeManager = this.getAttributeManager();

    if (attributeManager) {
      attributeManager.add({
        brushingTargets: {
          size: 2,
          accessor: 'getBrushingTarget',
          update: !this.props.getBrushingTarget && extension.useConstantTargetPositions,
          shaderAttributes: {
            brushingTargets: {
              divisor: 0
            },
            instanceBrushingTargets: {
              divisor: 1
            }
          }
        }
      });
    }

    extension.onMouseMove = () => {
      this.getCurrentLayer().setNeedsRedraw();
    };

    if (this.context.deck) {
      this.context.deck.eventManager.on({
        pointermove: extension.onMouseMove,
        pointerleave: extension.onMouseMove
      });
    }
  }

  finalizeState(extension) {
    if (this.context.deck) {
      this.context.deck.eventManager.off({
        pointermove: extension.onMouseMove,
        pointerleave: extension.onMouseMove
      });
    }
  }

  useConstantTargetPositions(attribute) {
    attribute.constant = true;
    attribute.value = new Float32Array(2);
    return;
  }

}
BrushingExtension.extensionName = 'BrushingExtension';
BrushingExtension.defaultProps = defaultProps;
//# sourceMappingURL=brushing.js.map