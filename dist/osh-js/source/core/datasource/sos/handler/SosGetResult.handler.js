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
import SosGetResultRealTimeContext from "../context/SosGetResult.realtime.context";
import SosGetResultReplayContext from "../context/SosGetResult.replay.context";
import {Mode} from "../../Mode";
import SosGetResultBatchContext from "../context/SosGetResult.batch.context";

class SosGetResultHandler extends TimeSeriesHandler {
    createContext(properties) {
        if(properties.mode === Mode.REAL_TIME) {
            return new SosGetResultRealTimeContext();
        } else if(properties.mode === Mode.REPLAY){
            return new SosGetResultReplayContext();
        } else if(properties.mode === Mode.BATCH){
            return new SosGetResultBatchContext();
        }
        throw Error(`Not supported mode=${properties.mode}`);
    }
}

export default SosGetResultHandler;
