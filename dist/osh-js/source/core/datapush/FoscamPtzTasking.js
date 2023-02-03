/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2020 Mathieu Dhainaut. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

/**
 *
 * From describe tasking:
 * sweapi:item name="relMove">
 <sweapi:Text definition="http://sensorml.com/ont/swe/property/CameraRelativeMovementName">
 <sweapi:label>Camera Relative Movements</sweapi:label>
 <sweapi:constraint>
 <sweapi:AllowedTokens>
 <sweapi:value>Down</sweapi:value>
 <sweapi:value>Up</sweapi:value>
 <sweapi:value>Left</sweapi:value>
 <sweapi:value>Right</sweapi:value>
 <sweapi:value>TopLeft</sweapi:value>
 <sweapi:value>TopRight</sweapi:value>
 <sweapi:value>BottomLeft</sweapi:value>
 <sweapi:value>BottomRight</sweapi:value>
 </sweapi:AllowedTokens>
 </sweapi:constraint>
 </sweapi:Text>
 </sweapi:item>

 <sweapi:item name="preset">
 <sweapi:Text definition="http://sensorml.com/ont/swe/property/CameraPresetPositionName">
 <sweapi:label>Preset Camera Position</sweapi:label>
 <sweapi:constraint>
 <sweapi:AllowedTokens>
 <sweapi:value>Reset</sweapi:value>
 <sweapi:value>TopMost</sweapi:value>
 <sweapi:value>BottomMost</sweapi:value>
 <sweapi:value>LeftMost</sweapi:value>
 <sweapi:value>RightMost</sweapi:value>
 </sweapi:AllowedTokens>
 </sweapi:constraint>
 </sweapi:Text>
 </sweapi:item>
 */

import PtzTasking from './PtzTasking.js';

/**
 * @extends DataSink
 */
class FoscamPtzTasking extends PtzTasking {

    /**
     * Gets the command data.
     * @param {Object}  values -
     * @param {String}  values.preset -
     * @param {String}  values.rzoom -
     * @param {String}  values.rpan -
     * @param {String}  values.rtilt -
     * @return {string}
     */
    getCommandData(values) {
        let cmdData = "";

        if (values.preset !== null) {
            cmdData = "preset," + values.preset;
        } else if (values.rzoom !== null) {
            cmdData = "zoom,";
            if (values.rzoom < 0) {
                cmdData += "out";
            } else {
                cmdData += "in";
            }
        } else {
            if (values.rpan !== null && values.rtilt !== null) {
                cmdData += "relMove,";

                if (values.rtilt !== null) {
                    if (values.rtilt < 0) {
                        cmdData += "Bottom";
                    } else {
                        cmdData += "Top";
                    }
                }

                if (values.rpan < 0) {
                    cmdData += "Left";
                } else {
                    cmdData += "Right";
                }
            } else {
                if (values.rpan !== null) {
                    cmdData += "relMove,";
                    if (values.rpan < 0) {
                        cmdData += "Left";
                    } else {
                        cmdData += "Right";
                    }
                    cmdData += " "; //block separator
                }

                if (values.rtilt !== null) {
                    cmdData += "relMove,";
                    if (values.rtilt < 0) {
                        cmdData += "Down";
                    } else {
                        cmdData += "Up";
                    }
                }
            }
        }
        return cmdData;
    }
}

export default  FoscamPtzTasking;
