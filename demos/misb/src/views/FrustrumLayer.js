import Layer from "../../../../source/core/ui/layer/Layer";
import {isDefined, randomUUID} from "../../../../source/core/utils/Utils";

class FrustrumLayer extends Layer {
    /**
     */
    constructor(properties) {
        super(properties);
        this.type = 'frustrum';

        this.properties = properties;
        this.props.frustrumId = randomUUID();
        this.props.color = 'rgb(255,0,0)';
        this.origin = null;
        this.fov = null;
        this.near = 0.009;
        this.far = 400.0;
        this.opacity = 0.5;
        this.frame = null;
        this.orientation = null;

        const that = this;

        if(isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if(isDefined(properties.opacity)){
            this.props.opacity = properties.opacity;
        }

        if(isDefined(properties.frame)){
            this.props.frame = properties.frame;
        }

        if(isDefined(properties.getColor)) {
            let fn = function(rec) {
                that.props.color = that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOrigin)) {
            let fn = function(rec) {
                that.props.origin = that.getFunc('getOrigin')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOrigin'),fn);
        }

        if(isDefined(properties.getFov)) {
            let fn = function(rec) {
                that.props.fov = that.getFunc('getFov')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getFov'),fn);
        }

        if(isDefined(properties.getFrame)) {
            let fn = function(rec) {
                that.props.frame = that.getFunc('getFrame')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getFrame'),fn);
        }

        if(isDefined(properties.getOrientation)) {
            let fn = function(rec) {
                that.props.orientation = that.getFunc('getOrientation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOrientation'),fn);
        }

        this.saveState();
    }
}

export default  FrustrumLayer;
