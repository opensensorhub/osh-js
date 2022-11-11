/***************************** BEGIN LICENSE BLOCK ***************************

 The contents of this file are subject to the Mozilla Public License, v. 2.0.
 If a copy of the MPL was not distributed with this file, You can obtain one
 at http://mozilla.org/MPL/2.0/.

 Software distributed under the License is distributed on an "AS IS" basis,
 WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 for the specific language governing rights and limitations under the License.

 Copyright (C) 2015-2022 Georobotix Inc. All Rights Reserved.

 Author: Mathieu Dhainaut <mathieu.dhainaut@gmail.com>

 ******************************* END LICENSE BLOCK ***************************/

import TimeSeriesHandler from "../../common/handler/TimeSeries.handler";
import SweApiRealtimeContext from "../context/SweApi.realtime.context";
import SweApiReplayContext from "../context/SweApi.replay.context";
import {Mode} from "../../Mode";

class SweApiHandler extends TimeSeriesHandler {
    createContext(properties) {
        if(properties.mode === Mode.REPLAY || properties.mode === Mode.BATCH) {
            return new SweApiReplayContext();
        } else {
            return new SweApiRealtimeContext();
        }
    }
}

export default SweApiHandler;
