/***************************** BEGIN LICENSE BLOCK ***************************
 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.
 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.
 Copyright (C) 2021 Botts Innovative Research, Inc. All Rights Reserved.
 Author: Drew Botts <drew@botts-inc.com>
 ******************************* END LICENSE BLOCK ***************************/
import Layer from "./Layer.js";
import {isDefined} from "../../utils/Utils";

class EllipseLayer extends Layer {

    constructor(properties) {
        super(properties);
        this.type = 'ellipse';
        this.properties = properties;
        this.position = {};
        this.semiMajorAxis = null;
        this.semiMinorAxis = null;
        this.rotation = null;
        this.clampToGround = false;
        this.color = 'red';
        this.ellipseId = 'ellipse';
        this.name = '';


        if (isDefined(properties.name)){
            this.props.name = properties.name;
        }

        if (isDefined(properties.id)){
            this.props.id = properties.id;
        }

        if (isDefined(properties.color)){
            this.props.color = properties.color;
        }

        if (isDefined(properties.clampToGround)){
            this.props.clampToGround = properties.clampToGround;
        }

        if (isDefined(properties.rotation)){
            this.props.rotation = properties.rotation;
        }

        if (isDefined(properties.semiMinorAxis)){
            this.props.semiMinorAxis = properties.semiMinorAxis;
        }

        if (isDefined(properties.semiMajorAxis)){
            this.props.semiMajorAxis = properties.semiMajorAxis;
        }

        if (isDefined(properties.position)){
            this.props.position = properties.position;
        }

        let that = this;

        if (isDefined(properties.getEllipseID)){
            let fn = function (rec) {
                that.props.ellipseId = that.getFunc('getEllipseID')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getEllipseID'), fn);
        }

        if (isDefined(properties.getPosition)){
            let fn = function (rec){
                that.props.position = that.getFunc('getPosition')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getPosition'), fn);
        }

        if (isDefined(properties.getSemiMajorAxis)){
            let fn = function (rec){
                that.props.semiMajorAxis = that.getFunc('getSemiMajorAxis')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSemiMajorAxis'), fn);
        }

        if (isDefined(properties.getSemiMinorAxis)){
            let fn = function (rec){
                that.props.semiMinorAxis = that.getFunc('getSemiMinorAxis')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSemiMinorAxis'), fn);
        }

        if (isDefined(properties.getHeight)){
            let fn = function (rec){
                that.props.height = that.getFunc('getHeight')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getHeight'), fn);
        }

        if (isDefined(properties.getRotation)){
            let fn = function (rec){
                that.props.rotation = that.getFunc('getRotation')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getRotation'), fn);
        }

        if (isDefined(properties.getColor)){
            let fn = function (rec){
                that.props.color = that.getFunc('getColor')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getColor'), fn);
        }

    }
}
export default EllipseLayer;