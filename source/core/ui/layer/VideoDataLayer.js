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
 * import VideoDataLayer from 'osh-js/core/ui/layer/VideoDataLayer';
 *
 */
class VideoDataLayer extends BinaryDataLayer {

    constructor(properties) {
        super(properties);
        this.type = 'videoData';
        this.props.roll = 0;

        if (isDefined(properties.roll)){
            this.props.roll = properties.roll;
        }

        let that = this;

        if (isDefined(properties.getRoll)){
            let fn = async (rec) => {
                that.props.roll = await that.getFunc('getRoll')(rec);
            };
            this.addFn(that.getDataSourcesIdsByProperty('getRoll'), fn);
        }

        this.saveState();
    }
}
export default VideoDataLayer;
