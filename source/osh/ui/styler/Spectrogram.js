/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2020 Ian Patterson. All Rights Reserved.

 Author: Ian Patterson <cr31.dev@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/
import {isDefined} from "../../utils/Utils";
import Styler from "./Styler";

class Spectrogram extends Styler {
    constructor(properties) {
        super(properties);

        this.latestData = null;
        this.xLabel = 'Time';
        this.yLabel = 'Frequency (Hz)';
        this.zLabel = 'Amplitude (dB)';
        // Currently using chromatic scales from d3-scale-chromatic
        // TODO: Allow custom color sets
        this.colors = 'interpolateOrRd';
        this.powerRange = [-80, 250];

        if (isDefined(properties.xLabel)) {
            this.xLabel = properties.xLabel;
        }

        if (isDefined(properties.yLabel)) {
            this.yLabel = properties.yLabel;
        }

        if (isDefined(properties.zLabel)) {
            this.zLabel = properties.zLabel;
        }

        if (isDefined(properties.colors)) {
            this.colors = properties.colors;
        }

        if (isDefined(properties.colorRange)) {
            this.colorRange = properties.colorRange;
        }

        if (isDefined(properties.valuesFunc)) {
            let fn = function (rec, timeStamp, options) {
                let values = properties.valuesFunc.handler(rec, timeStamp, options);

            };
            this.addFn(properties.valuesFunc.dataSourceIds, fn);
        }
    }

    setData(dataSourceId, rec, view, options) {
        if (super.setData(dataSourceId, rec, view, options)) {
            if (isDefined(view)) {
                view.updateSpectrogram(this, rec.timestamp, options);
                return true;
            }
        }
        return false;
    }


}