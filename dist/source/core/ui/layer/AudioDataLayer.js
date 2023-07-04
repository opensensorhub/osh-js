/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import {isDefined} from "../../utils/Utils";
import BinaryDataLayer from "./BinaryDataLayer";

/**
 * @extends BinaryDataLayer
 * @example
 *
 * import AudioDataLayer from 'osh-js/core/ui/layer/AudioDataLayer';
 *
 */
class AudioDataLayer extends BinaryDataLayer {

    constructor(properties) {
        super(properties);
        this.type = 'audioData';
    }

    // call by super class
    init(properties=this.properties) {
        super.init(properties);

        const props = {
            sampleRate: 0
        };

        if (isDefined(properties.sampleRate)){
            props.sampleRate = properties.sampleRate;
        }

        this.definedId('audioDataId', props);

        if (isDefined(properties.getSampleRate)){
            let fn = async (rec, timestamp, options) => {
                this.updateProperty('sampleRate',await this.getFunc('getSampleRate')(rec, timestamp, options));
            };
            this.addFn(this.getDataSourcesIdsByProperty('getSampleRate'), fn);
        }
    }
}
export default AudioDataLayer;
