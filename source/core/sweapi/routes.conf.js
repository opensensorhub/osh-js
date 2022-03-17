const API = {
    datastreams: {
        search: '/datastreams',
        by_id: '/datastreams/{id}',
        observations: '/datastreams/{id}/observations',
        schema: '/datastreams/{id}/schema'
    },
    systems: {
        search: '/systems',
        by_id: '/systems/{id}',
        details: '/systems/{id}/details',
        fois: '/systems/{id}/featuresOfInterest',
        members: '/systems/{id}/members',
        datastreams: '/systems/{id}/datastreams',
        history: '/systems/{id}/history',
        history_ver: '/systems/{id}/history/{ver}',
        control_by_id: '/systems/{id}/controls/{dsid}',
        controls: '/systems/{id}/controls'
    },
    controls: {
        commands: '/systems/{sysid}/controls/{dsid}/commands',
        command_by_id: '/systems/{sysid}/controls/{dsid}/commands/{cmdid}',
        status: '/systems/{sysid}/controls/{dsid}/status',
        schema: '/systems/{sysid}/controls/{dsid}/schema'
    },
    commands: {
        status: '/systems/{sysid}/controls/{dsid}/commands/{cmdid}/status'
    },
    observations: {
        search: '/observations',
        by_id: '/observations/{id}',
    },
    fois: {
        search: '/featuresOfInterest',
        by_id: '/featuresOfInterest/{id}',
    },
};

export default API;
