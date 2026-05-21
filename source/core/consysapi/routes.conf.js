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

const API = {
    datastreams: {
        search: '/datastreams',
        by_id: '/datastreams/{id}',
        observations: '/datastreams/{id}/observations',
        schema: '/datastreams/{id}/schema'
    },
    systems: {
        search: '/systems',
        by_id: '/systems/{sysid}',
        details: '/systems/{sysid}/details',
        samplingFeatures: '/systems/{sysid}/samplingFeatures',
        members: '/systems/{sysid}/members',
        subsystems: '/systems/{sysid}/subsystems',
        datastreams: '/systems/{sysid}/datastreams',
        history_ver: '/systems/{sysid}/history/{ver}',
        controlstream_by_id: '/systems/{sysid}/controlstreams/{csid}',
        controlstreams: '/systems/{sysid}/controlstreams',
        events: '/systems/{sysid}/events',
        history: '/systems/{sysid}/history',
    },
    controlstreams: {
        search: '/controlstreams',
        by_id: '/controlstreams/{csid}',
        commands: '/controlstreams/{csid}/commands',
        command_by_id: '/controlstreams/{csid}/commands/{cmdid}',
        status: '/controlstreams/{csid}/status',
        schema: '/controlstreams/{csid}/schema'
    },
    commands: {
        search: '/commands',
        by_id: '/commands/{cmdid}',
        status: '/systems/{sysid}/controlstreams/{csid}/commands/{cmdid}/status'
    },
    observations: {
        search: '/observations',
        by_id: '/observations/{id}',
    },
    samplingFeatures: {
        search: '/samplingFeatures',
        by_id: '/samplingFeatures/{id}',
    },
};

export default API;
