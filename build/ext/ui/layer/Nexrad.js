/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Sensia Software LLC. All Rights Reserved.

 Author: Alex Robin <alex.robin@sensiasoft.com>

 ******************************* END LICENSE BLOCK ***************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isDefined } from "../../../core/utils/Utils.js";
import Layer from "../../../core/ui/layer/Layer.js";
/**
 * Nexrad Layer.
 * @extends Layer
 */
var Nexrad = /** @class */ (function (_super) {
    __extends(Nexrad, _super);
    /**
        * Creates the Layer.
        * @param {Object} properties
        * @param {Number[]} properties.location - [x,y]
        * @param {Object} radialData
        * @param {Function} properties.getLocation -
        * @param {Function} properties.getRadialData -
        *
        */
    function Nexrad(properties) {
        var _this = _super.call(this, properties) || this;
        _this.properties = properties;
        _this.location = null;
        _this.radialData = null;
        _this.options = {};
        var that = _this;
        if (isDefined(properties.location)) {
            _this.location = properties.location;
        }
        if (isDefined(properties.radialData)) {
            _this.radialData = properties.radialData;
        }
        if (isDefined(properties.getLocation)) {
            var fn = function (rec, timeStamp, options) {
                that.location = properties.getLocation.handler(rec, timeStamp, options);
            };
            _this.addFn(properties.getLocation.dataSourceIds, fn);
        }
        if (isDefined(properties.getRadialData)) {
            var fn = function (rec, timeStamp, options) {
                that.radialData = properties.getRadialData.handler(rec, timeStamp, options);
            };
            _this.addFn(properties.getRadialData.dataSourceIds, fn);
        }
        _this.reflectivityColorMap = [
            Cesium.Color.fromBytes(100, 100, 100),
            Cesium.Color.fromBytes(204, 255, 255),
            Cesium.Color.fromBytes(204, 153, 204),
            Cesium.Color.fromBytes(153, 102, 153),
            Cesium.Color.fromBytes(102, 51, 102),
            Cesium.Color.fromBytes(204, 204, 153),
            Cesium.Color.fromBytes(153, 153, 102),
            Cesium.Color.fromBytes(100, 100, 100),
            Cesium.Color.fromBytes(4, 233, 231),
            Cesium.Color.fromBytes(1, 159, 244),
            Cesium.Color.fromBytes(3, 0, 244),
            Cesium.Color.fromBytes(2, 253, 2),
            Cesium.Color.fromBytes(1, 197, 1),
            Cesium.Color.fromBytes(0, 142, 0),
            Cesium.Color.fromBytes(253, 248, 2),
            Cesium.Color.fromBytes(229, 188, 0),
            Cesium.Color.fromBytes(253, 149, 0),
            Cesium.Color.fromBytes(253, 0, 0),
            Cesium.Color.fromBytes(212, 0, 0),
            Cesium.Color.fromBytes(188, 0, 0),
            Cesium.Color.fromBytes(248, 0, 253),
            Cesium.Color.fromBytes(152, 84, 198),
            Cesium.Color.fromBytes(253, 253, 253)
        ];
        _this.pointCollection = new Cesium.PointPrimitiveCollection();
        _this.radialCount = 0;
        return _this;
    }
    Nexrad.prototype.setData = function (dataSourceId, rec, view, options) {
        if (_super.prototype.setData.call(this, dataSourceId, rec, view, options)) {
            if (isDefined(view)) {
                var DTR = Math.PI / 180;
                // keep only first elevation
                if (rec.data.elevation > 0.7) {
                    return false;
                }
                // draw directly in Cesium view
                var radarLoc = Cesium.Cartesian3.fromDegrees(this.location.x, this.location.y, this.location.z);
                var quat = Cesium.Transforms.headingPitchRollQuaternion(radarLoc, (rec.data.azimuth - 90) * DTR, rec.data.elevation * DTR, 0.0);
                var rotM = Cesium.Matrix3.fromQuaternion(quat);
                var points = new Cesium.PointPrimitiveCollection();
                var dist0 = rec.data.rangeToCenterOfFirstRefGate;
                var step = rec.data.refGateSize;
                for (var i = 0; i < rec.data.reflectivity.length; i++) {
                    var val = rec.data.reflectivity[i];
                    // skip points that are out of range
                    if (val < -32 || val > 94.5) {
                        continue;
                    }
                    var gatePos = new Cesium.Cartesian3(dist0 + i * step, 0, 0);
                    Cesium.Matrix3.multiplyByVector(rotM, gatePos, gatePos);
                    // apply color map and add point to collection
                    this.pointCollection.add({
                        position: Cesium.Cartesian3.add(radarLoc, gatePos, gatePos),
                        color: this.getReflectivityColor(val),
                        pixelSize: 3
                    });
                }
                this.radialCount++;
                if (this.radialCount === 100) {
                    view.viewer.scene.primitives.add(this.pointCollection);
                    this.pointCollection = new Cesium.PointPrimitiveCollection();
                    this.radialCount = 0;
                }
            }
            return true;
        }
        return false;
    };
    /**
     *
     * @private
     */
    Nexrad.prototype.getReflectivityColor = function (val) {
        var index = Math.floor((val + 30) / 5) + 1;
        return this.reflectivityColorMap[index];
    };
    return Nexrad;
}(Layer));
export default Nexrad;
//# sourceMappingURL=Nexrad.js.map