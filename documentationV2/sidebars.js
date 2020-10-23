module.exports = {
    someSidebar: {
        'OpenSensorHub Toolkit': [
            'intro',
            'server',
            'projects'
        ],
        'Getting Started': [
            'getting_started/installation',
            'getting_started/integration',
            'getting_started/usage'
        ],
        'DataSources': [
            'datasources/index',
            {
                type: 'category',
                label: 'SOS',
                items: [
                    'datasources/sos/index',
                    'datasources/sos/swejson',
                    'datasources/sos/video',
                    'datasources/sos/videoroll'
                ],
            },
            {
                type: 'category',
                label: 'SPS',
                items: [
                    'datasources/sps/datasink',
                    'datasources/sps/ptz',
                    'datasources/sps/foscam'
                ],
            }
        ],
        'DataSynchronizer': [
            'datasynchronizer/index'
        ],
        'Views': [
            'views/index',
            {
                type: 'category',
                label: 'Map',
                items: [
                    'views/map/ol',
                    'views/map/leaflet',
                    'views/map/cesium',
                ],
            },
            {
                type: 'category',
                label: 'Video',
                items: [
                    'views/video/ffmpeg',
                    'views/video/mjpeg'
                ],
            },
            {
                type: 'category',
                label: 'Stylers',
                items: ['views/stylers/index'],
            },
            'views/entity/entity',
            {
                type: 'category',
                label: 'Ext',
                items: [
                    'views/ext/index',
                    'views/ext/rangeslider',
                    'views/ext/tasking'
                ],
            }
        ],
        'Vue.js components': [
            'vuejs/index',
            'vuejs/control',
            'vuejs/menusettings',
            'vuejs/videocontrol',
        ],
        'Advanced': [
            'advanced/datasynchronizer'
        ]
    }
};
