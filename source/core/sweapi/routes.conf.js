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
        fois: '/systems/{sysid}/featuresOfInterest',
        members: '/systems/{sysid}/members',
        datastreams: '/systems/{sysid}/datastreams',
        history_ver: '/systems/{sysid}/history/{ver}',
        control_by_id: '/systems/{sysid}/controls/{dsid}',
        controls: '/systems/{sysid}/controls',
        events: '/systems/{sysid}/events',
        history: '/systems/{sysid}/history',
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
