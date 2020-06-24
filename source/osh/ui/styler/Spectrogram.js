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

class Spectrogram extends Styler{
    constructor(properties) {
        super(properties);

        this.xLabel = 'Time';
        this.yLabel = 'Frequency (Hz)';
        this.zLabel = 'Amplitude (dB)';
        this.colors = [
            '#FF0000',
            '#FF7F00',
            '#FFFF00',
            '#00FF00',
            '#0000FF',
            '#2E2B5F',
            '#8B00FF',
        ];
        this.colorRange = [-80,250];

        if(isDefined(properties.xLabel)){
            this.xLabel = properties.xLabel;
        }

        if(isDefined(properties.yLabel)){
            this.yLabel = properties.yLabel;
        }

        if(isDefined(properties.zLabel)){
            this.zLabel = properties.zLabel;
        }

        if(isDefined(properties.colors)){
            this.colors = properties.colors;
        }

        if(isDefined(properties.colorRange)){
            this.colorRange = properties.colorRange;
        }
    }

    setData(dataSourceId, rec, view, options){
        if(super.setData(dataSourceId, rec, view, options)){
            if(isDefined(view)){
                view.updateSpectrogram(this. rec.timestamp, options);
                return true;
            }
        }
        return  false;
    }
}