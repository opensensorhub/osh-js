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
        this.props.sampleRate = 0;

        if (isDefined(properties.sampleRate)){
            this.props.sampleRate = properties.sampleRate;
        }

        let that = this;

        if (isDefined(properties.getSampleRate)){
            let fn = async (rec) => {
                that.props.sampleRate = await that.getFunc('getSampleRate')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getSampleRate'), fn);
        }

        this.saveState();
    }
}
export default AudioDataLayer;
