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

import Layer from "../../../core/ui/layer/Layer";
import {isDefined} from "../../../core/utils/Utils";

class Spectrogram extends Layer {
    constructor(properties) {
        super(properties);

        this.type = 'spectrogram';
        this.props.latestData = null;
        this.props.xLabel = 'Time';
        this.props.yLabel = 'Frequency (Hz)';
        this.props.zLabel = 'Amplitude (dB)';
        // Currently using chromatic scales from d3-scale-chromatic
        // TODO: Allow custom color sets
        this.props.colors = 'interpolateOrRd';
        this.props.powerRange = [-80, 250];

        let self = this;

        if (isDefined(properties.xLabel)) {
            this.props.xLabel = properties.xLabel;
        }

        if (isDefined(properties.yLabel)) {
            this.props.yLabel = properties.yLabel;
        }

        if (isDefined(properties.zLabel)) {
            this.props.zLabel = properties.zLabel;
        }

        if (isDefined(properties.colors)) {
            this.props.colors = properties.colors;
        }

        if (isDefined(properties.colorRange)) {
            this.props.colorRange = properties.colorRange;
        }

        if (isDefined(properties.getValues)) {
            let fn = function (rec, timestamp, options) {
                let values = properties.getValues.handler(rec, timestamp, options);

                if (Array.isArray(values)) {
                    self.props.latestData = values;
                } else {
                    self.props.latestData = [values];
                }
            };
            this.addFn(properties.getValues.dataSourceIds, fn);
        }
    }
}

export default Spectrogram;
