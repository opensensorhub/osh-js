import CesiumView from "osh-js/core/ui/view/map/CesiumView";
import {HeadingPitchRange, Math as CesiumMath} from "cesium";
import {isDefined} from "osh-js/core/utils/Utils";

class CustomCesiumView extends CesiumView {

    constructor(properties) {
        super(properties);
    }

    panToLayer(layer) {
        let marker = this.getMarker(layer.props);
        this.viewer.zoomTo(marker, new HeadingPitchRange(CesiumMath.toRadians(0),CesiumMath.toRadians(-90),2000));
    }
}
export default CustomCesiumView;
