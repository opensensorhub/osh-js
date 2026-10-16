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

import {isDefined} from "../../../utils/Utils";
import ObservationFilter from "../../../consysapi/observation/ObservationFilter";
import DataSourceContext from "../../common/context/DataSource.context";
import ControlStreamFilter from "../../../consysapi/controlstream/ControlStreamFilter";

class ConSysApiContext extends DataSourceContext {
    createControlStreamFilter(properties) {
        const props = {};
        if(isDefined(properties.keywords)) {
            props.q = properties.keywords;
        }
        if(isDefined(properties.actuableProperty)) {
            props.actuableProperty = properties.actuableProperty;
        }
        if(isDefined(properties.statusCode)) {
            props.statusCode = properties.statusCode;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.issueTime)) {
            props.issueTime = properties.issueTime;
        }
        if(isDefined(properties.executionTime)) {
            props.executionTime = properties.executionTime;
        }
        if(isDefined(properties.reportTime)) {
            props.reportTime = properties.reportTime;
        }

        return new ControlStreamFilter(props);
    }

    createObservationFilter(properties) {
        const props = {};
        if(isDefined(properties.roi)) {
            props.location = props.roi;
        }
        if(isDefined(properties.responseFormat)) {
            props.format = properties.responseFormat;
        }
        if(isDefined(properties.replaySpeed)) {
            props.replaySpeed = properties.replaySpeed;
        }
        if(isDefined(properties.startTime)) {
            props.phenomenonTime = properties.startTime + '/' + properties.endTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.resultTime)) {
            props.resultTime = properties.resultTime;
        }
        if(isDefined(properties.featureOfInterest)) {
            props.featureOfInterest = properties.featureOfInterest;
        }
        if(isDefined(properties.excludedProps)) {
            props.select = properties.excludedProps.map(e => '!' + e);
        }
        if(isDefined(properties.includedProps)) {
            if(!isDefined(props.select)) {
                props.select = [];
            }
            props.select.concat(properties.includedProps);
        }

        return new ObservationFilter(props);
    }
}


export default ConSysApiContext;
