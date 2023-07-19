import CesiumView from "osh-js/core/ui/view/map/CesiumView";
import {isDefined} from "../../source/core/utils/Utils";
import {PointPrimitiveCollection} from "cesium";

import {
    Cartesian3,
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
        this.radialCount = 0;
    }

    async setData(dataSourceId, data) {
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

        // keep only first elevation
        if (props.elevation > 0.7) {
            return false;
        }

        // draw directly in Cesium view
        console.log(props)
        let radarLoc = Cartesian3.fromDegrees(props.location.x, props.location.y, props.location.z);
        //Transforms.headingPitchRollQuaternion(position, new HeadingPitchRoll(heading * DTR, /*roll*DTR*/0.0, pitch * DTR));
        let quat = Transforms.headingPitchRollQuaternion(radarLoc, new HeadingPitchRoll((props.azimuth-90)*DTR));
        console.log(quat)
        let rotM = Matrix3.fromQuaternion(quat);

        let points = new PointPrimitiveCollection();
        let dist0 = props.rangeToCenterOfFirstRefGate;
        let step = props.refGateSize;
        for (let i=0; i<props.reflectivity.length; i++) {

            let val = props.reflectivity[i];

            // skip points that are out of range
            if (val < -32 || val > 94.5) {
                continue;
            }

            let gatePos = new Cartesian3(dist0 + i*step, 0, 0);
            Matrix3.multiplyByVector(rotM, gatePos, gatePos);

            // apply color map and add point to collection
            console.log(radarLoc, gatePos)
            points.add({
                position : Cartesian3.add(radarLoc, gatePos, gatePos),
                color : this.getReflectivityColor(val),
                pixelSize : 3
            });
        }

        this.radialCount++;
        this.viewer.scene.primitives.add(points);
        // if (this.radialCount === 100) {
        //     this.viewer.scene.primitives.add(points);
        //     this.radialCount = 0;
        // }

        this.viewer.camera.flyTo({
            destination : Cartesian3.fromDegrees(props.location.y, props.location.x, 30000),
            duration : 1.0
        });

        console.log(props);
    }

    getReflectivityColor(val) {
        let index = Math.floor((val + 30) / 5) + 1;
        return this.reflectivityColorMap[index];
    }
}

export default NexradView;
