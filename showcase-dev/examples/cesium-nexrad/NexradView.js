import CesiumView from "osh-js/core/ui/view/map/CesiumView";
import {isDefined} from "osh-js/core/utils/Utils";
import {PointPrimitiveCollection} from "cesium";

import {
    Cartesian3,
    Cartographic,
    Color,
    Transforms,
    Matrix3,
    HeadingPitchRoll
} from 'cesium';

class NexradView extends CesiumView {
    constructor(properties) {
        super({
            supportedLayers: ['marker', 'drapedImage', 'polyline', 'ellipse', 'polygon', 'coplanarPolygon', 'frustum', 'nexrad'],
            ...properties
        });
        // this.radials = new Set();  // produces undefined when accessing from function; define in beforeAddingItems and it works
    }
    beforeAddingItems(options) {
        super.beforeAddingItems(options);
        this.reflectivityColorMap = [
            Color.fromBytes(100, 100, 100),
            Color.fromBytes(204, 255, 255),
            Color.fromBytes(204, 153, 204),
            Color.fromBytes(153, 102, 153),
            Color.fromBytes(102,  51, 102),
            Color.fromBytes(204, 204, 153),
            Color.fromBytes(153, 153, 102),
            Color.fromBytes(100, 100, 100),
            Color.fromBytes(  4, 233, 231),
            Color.fromBytes(  1, 159, 244),
            Color.fromBytes(  3,   0, 244),
            Color.fromBytes(  2, 253,   2),
            Color.fromBytes(  1, 197,   1),
            Color.fromBytes(  0, 142,   0),
            Color.fromBytes(253, 248,   2),
            Color.fromBytes(229, 188,   0),
            Color.fromBytes(253, 149,   0),
            Color.fromBytes(253,   0,   0),
            Color.fromBytes(212,   0,   0),
            Color.fromBytes(188,   0,   0),
            Color.fromBytes(248,   0, 253),
            Color.fromBytes(152,  84, 198),
            Color.fromBytes(253, 253, 253)
        ];

        this.pointCollection = new PointPrimitiveCollection();
        this.radials = new Set();
        this.radialCount = 0;
        this.prevElevation = 0.0;
    }

    async setData(dataSourceId, data) {
        // need to do this ONLY when elevation changes (for single elevation)
        const values = data.values;
        for(let i=0;i < values.length;i++) {
            const d = values[i];
            if(data.type === 'nexrad') {
                await this.updateNexrad(d);
            }
        }
    }
    
    async updateNexrad(props) {
        if (!isDefined(props.location)) {
            return;
        }

        let DTR = Math.PI/180;

        // if(Math.abs(props.elevation - this.prevElevation) > 0.3) {
        if(Math.abs(props.elevation - this.prevElevation) > 0.4 && props.elevation <= 0.7) {
                // console.log('NexradView elevation: ' + props.elevation);
            // if(props.elevation <= 0.7) {
                this.radials.forEach(radial => {
                    this.viewer.scene.primitives.remove(radial);
                });
                this.radials = new Set();
            // }
            console.log('\t** numRadials: ' + this.radials.size);
        }
        this.prevElevation = props.elevation;

        // create Transform from Radar coords to ECEF
        let radarLoc = Cartesian3.fromDegrees(props.location.x, props.location.y, props.location.z);
        var lla = Cartographic.fromCartesian(radarLoc);
        // console.log("lla: " + lla.latitude* 180.0/Math.PI + "," + lla.longitude* 180.0/Math.PI + "," + lla.height);
        //Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(heading * DTR, /*roll*DTR*/0.0, pitch * DTR));
        let verticalScale = 2.5;
        let quat = Transforms.headingPitchRollQuaternion(radarLoc,   
            new HeadingPitchRoll( (props.azimuth-90)*DTR, (props.elevation * verticalScale * DTR) ));
        //let quat = Transforms.headingPitchRollQuaternion(radarLoc, new HeadingPitchRoll((props.azimuth-90)*DTR));
        let rotM = Matrix3.fromQuaternion(quat);

        let points = new PointPrimitiveCollection();
        let dist0 = props.rangeToCenterOfFirstRefGate;
        let step = props.refGateSize;

        for (let i=0; i<props.reflectivity.length; i++) {

            let val = props.reflectivity[i];

            // skip points that are out of range
            // min lower value is -32, but raising lower thereshold here masks out lower values and
            // makes display a little cleaner
            // if (val < -32 || val > 94.5) {
            if (val < 0 || val > 94.5) {
                   continue;
            }

            let gatePos = new Cartesian3(dist0 + i*step, 0, 0);
            Matrix3.multiplyByVector(rotM, gatePos, gatePos);

            // apply color map and add point to collection
            // console.log(radarLoc, gatePos)
            points.add({
                position : Cartesian3.add(radarLoc, gatePos, gatePos),
                color : this.getReflectivityColor(val),
                pixelSize : 3
            });
        }

        this.radialCount++;

        //  points here is pointPrimitive collection of all points along a single radial
        this.radials.add(points);
        this.viewer.scene.primitives.add(points);

        this.viewer.scene.requestRender();

        // let  size = this.viewer.scene.primitives.length;
        // console.log('\t** numPt prims: ' + size);
        if(this.radials.size % 100 == 0)
            console.log('\t** numRadials: ' + this.radials.size);

        // this.viewer.camera.flyTo({
        //     // destination : Cartesian3.fromDegrees(props.location.y, props.location.x, props.location.z),
        //     destination : radarLoc,
        //     duration : 1.0
        // });
    }

    getReflectivityColor(val) {
        let index = Math.floor((val + 30) / 5) + 1;
        return this.reflectivityColorMap[index];
    }
}

export default NexradView;
