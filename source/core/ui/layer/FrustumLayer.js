import Layer from "../../../../source/core/ui/layer/Layer";
import {isDefined, randomUUID} from "../../../../source/core/utils/Utils";

class frustumLayer extends Layer {
    /**
     */
    constructor(properties) {
        super(properties);
        this.type = 'frustum';

        this.properties = properties;
        this.props.frustumId = randomUUID();
        this.props.color = 'rgb(255,0,0)';
        this.opacity = 0.5;
        this.origin = null;
        this.fov = null;
        this.near = 0.009;
        this.range = null;
        this.platformOrientation = {heading: 0.0, pitch: 0.0, roll: 0.0};
        this.sensorOrientation = {yaw: 0.0, pitch: 0.0, roll: 0.0};

        const that = this;

        if(isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if(isDefined(properties.opacity)){
            this.props.opacity = properties.opacity;
        }

        if(isDefined(properties.getColor)) {
            let fn = async (rec) => {
                that.props.color = await  that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'),fn);
        }

        if(isDefined(properties.getOrigin)) {
            let fn = async (rec) => {
                that.props.origin = await that.getFunc('getOrigin')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getOrigin'),fn);
        }

        if(isDefined(properties.getFov)) {
            let fn = async (rec) => {
                that.props.fov = await that.getFunc('getFov')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getFov'),fn);
        }

        if(isDefined(properties.getRange)) {
            let fn = async (rec) => {
                that.props.range = await that.getFunc('getRange')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getRange'),fn);
        }

        if(isDefined(properties.getPlatformOrientation)) {
            let fn = async (rec) => {
                that.props.platformOrientation = await that.getFunc('getPlatformOrientation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPlatformOrientation'),fn);
        }

        if(isDefined(properties.getSensorOrientation)) {
            let fn = async (rec) => {
                that.props.sensorOrientation = await that.getFunc('getSensorOrientation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSensorOrientation'),fn);
        }

        this.saveState();
    }
}

export default  frustumLayer;
