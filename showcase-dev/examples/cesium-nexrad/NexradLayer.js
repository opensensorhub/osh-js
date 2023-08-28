import Layer from "osh-js/core/ui/layer/Layer";
import {assertObject, hasValue} from "osh-js/core/utils/Utils";
import {isDefined} from "osh-js/core/utils/Utils";

class NexradLayer extends Layer {
    constructor(properties) {
        super(properties);
        this.type = 'nexrad';
    }
    // call by super class
    init(properties=this.properties) {
        super.init(properties);
        const props = {
            location: null,
            azimuth: null,
            elevation: null,
            rangeToCenterOfFirstRefGate: null,
            refGateSize: null,
            reflectivity: null
        };

        if (hasValue(properties.location)) {
            assertObject(properties.location, "location");
            props.location = properties.location;
        }


        if (isDefined(properties.azimuth)) {
            props.azimuth = properties.azimuth;
        }

        if (isDefined(properties.elevation)) {
            props.elevation = properties.elevation;
        }

        if (isDefined(properties.rangeToCenterOfFirstRefGate)) {
            props.rangeToCenterOfFirstRefGate = properties.rangeToCenterOfFirstRefGate;
        }

        if (isDefined(properties.refGateSize)) {
            props.refGateSize = properties.refGateSize;
        }

        if (isDefined(properties.reflectivity)) {
            props.reflectivity = properties.reflectivity;
        }

        this.definedId('nexradId', props);

        if (this.checkFn("getLocation")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('location',await this.getFunc('getLocation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getLocation'), fn);
        }

        if (this.checkFn("getAzimuth")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('azimuth',await this.getFunc('getAzimuth')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getAzimuth'), fn);
        }

        if (this.checkFn("getElevation")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('elevation',await this.getFunc('getElevation')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getElevation'), fn);
        }

        if (this.checkFn("getRangeToCenterOfFirstRefGate")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('rangeToCenterOfFirstRefGate',await this.getFunc('getRangeToCenterOfFirstRefGate')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getRangeToCenterOfFirstRefGate'), fn);
        }

        if (this.checkFn("getRefGateSize")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('refGateSize',await this.getFunc('getRefGateSize')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getRefGateSize'), fn);
        }

        if (this.checkFn("getReflectivity")) {
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('reflectivity',await this.getFunc('getReflectivity')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getReflectivity'), fn);
        }
    }
}

export default NexradLayer;
