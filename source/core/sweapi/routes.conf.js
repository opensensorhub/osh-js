const API = {
    datastreams: {
        search: '/api/datastreams',
        by_id: '/api/datastreams/{id}',
        observations: '/api/datastreams/{id}/observations'
    },
    systems: {
        search: '/api/systems',
        by_id: '/api/systems/{id}',
        details: '/api/systems/{id}/details',
        fois: '/api/systems/{id}/featuresOfInterest',
        members: '/api/systems/{id}/members',
        datastreams: '/api/systems/{id}/datastreams',
        history: '/api/systems/{id}/history',
        history_ver: '/api/systems/{id}/history/{ver}',
        control_by_id: '/api/systems/{id}/controls/{dsid}',
        controls: '/api/systems/{id}/controls'
    },
    controls: {
        commands: '/api/systems/{sysid}/controls/{dsid}/commands',
        command_by_id: '/api/systems/{sysid}/controls/{dsid}/commands/{cmdid}',
        status: '/api/systems/{sysid}/controls/{dsid}/status'
    },
    commands: {
        status: '/api/systems/{sysid}/controls/{dsid}/commands/{cmdid}/status'
    },
    observations: {
        search: '/api/observations',
        by_id: '/api/observations/{id}',
    },
    fois: {
        search: '/api/featuresOfInterest',
        by_id: '/api/featuresOfInterest/{id}',
    },
};

export default API;
