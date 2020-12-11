const {description} = require('../../package')
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    configureWebpack: {
        resolve: {
            modules: [
                path.resolve(__dirname, 'node_modules')
            ]
        },
        module: {
            rules: [
                {
                    test: /\.worker\.js$/,
                    use: {loader: 'worker-loader'}
                }
            ]
        },
        plugins: [
            new CopyWebpackPlugin({patterns: [{ from:  path.resolve(__dirname,'../../../../showcase/dist'), to: 'showcase' }]}),
            new CopyWebpackPlugin({patterns: [{ from:  path.resolve(__dirname,'../../../../documentation/jsdoc/build-iframe'), to: 'guide/api' }]})
        ]
    },
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#title
     */
    title: 'OpenSensorHub Toolkit',
    /**
     * Ref：https://v1.vuepress.vuejs.org/config/#description
     */
    description: 'OpenSensorHub Web Client toolkit allows you to visualize data from OSH. It provides the necessary tools to build your own web application for monitoring your sensors',

    /**
     * Extra tags to be injected to the page HTML `<head>`
     *
     * ref：https://v1.vuepress.vuejs.org/config/#head
     */
    head: [
        ['meta', {name: 'theme-color', content: '#af8f3e'}],
        ['meta', {name: 'apple-mobile-web-app-capable', content: 'yes'}],
        ['meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black'}]
    ],
    dest: 'dist',
    base: '/osh-js/v2.0.0/doc/',
    /**
     * Theme configuration, here is the default theme configuration for VuePress.
     *
     * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
     */
    themeConfig: {
        repo: '',
        editLinks: false,
        docsDir: '',
        editLinkText: '',
        lastUpdated: false,
        logo: '/images/logo-osh.png',
        sidebar: 'auto',
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Samples',
                link: 'http://opensensorhub.github.io/osh-js/v2.0.0/showcase/',
            },
            {
                text: 'API',
                link: 'http://opensensorhub.github.io/osh-js/v2.0.0/documentation/jsdoc/'
            },
            {
                text: 'Blog',
                link: 'https://opensensorhub.org/'
            },
            {
                text: 'Github',
                link: 'https://github.com/opensensorhub/osh-js'
            }
        ],
        sidebar: {
            '/guide/': [
                {
                    title: 'OpenSensorHub Toolkit',
                    collapsable: true,
                    children: [
                        '/guide/intro.md',
                        '/guide/server.md',
                        '/guide/projects.md'
                    ]
                },
                {
                    title: 'Getting Started',
                    collapsable: true,
                    children: [
                        '/guide/getting_started/installation.md',
                        {
                            title: 'Integration',
                            collapsable: true,
                            children: [
                                '/guide/getting_started/integration.md',
                                '/guide/getting_started/webpack.md'
                            ]
                        },
                        '/guide/getting_started/usage.md'
                    ]
                },
                {
                    title: 'DataSources',
                    collapsable: true,
                    children: [
                        '/guide/datasources/general.md',
                        {
                            title: 'SOS',
                            collapsable: true,
                            children: [
                                '/guide/datasources/sos/general.md',
                                '/guide/datasources/sos/swejson.md',
                                '/guide/datasources/sos/video.md',
                                '/guide/datasources/sos/videoroll.md',
                                '/guide/datasources/sos/batch_replayspeed.md'
                            ]
                        },
                        {
                            title: 'SPS',
                            collapsable: true,
                            children: [
                                '/guide/datasources/sps/datasink.md',
                                '/guide/datasources/sps/foscamtasking.md',
                                '/guide/datasources/sps/ptztasking.md'
                            ]
                        }
                    ]
                },
                '/guide/datasynchronizer/general.md',
                {
                    title: 'Views',
                    collapsable: true,
                    children: [
                        '/guide/views/general.md',
                        {
                            title: 'Layer',
                            collapsable: true,
                            children: [
                                '/guide/views/layers/general.md',
                            ]
                        },
                        {
                            title: 'Map',
                            collapsable: true,
                            children: [
                                '/guide/views/map/general.md',
                                '/guide/views/map/ol.md',
                                '/guide/views/map/leaflet.md',
                                '/guide/views/map/cesium.md',
                            ]
                        },
                        '/guide/views/chart.md',
                        '/guide/views/spectrogram.md',
                        {
                            title: 'Video',
                            collapsable: true,
                            children: [
                                '/guide/views/video/ffmpeg.md',
                                '/guide/views/video/mjpeg.md'
                            ]
                        },
                        {
                            title: 'Entity',
                            collapsable: true,
                            children: [
                                '/guide/views/entity/entity.md',
                            ]
                        },
                        {
                            title: 'Ext',
                            collapsable: true,
                            children: [
                                '/guide/views/ext/general.md',
                                '/guide/views/ext/rangeslider.md',
                                '/guide/views/ext/tasking.md',
                            ]
                        },
                    ]
                },
                {
                    title: 'Vue.js components',
                    collapsable: true,
                    children: [
                        '/guide/vuejs/general.md',
                        '/guide/vuejs/control.md',
                        '/guide/vuejs/menusettings.md',
                        '/guide/vuejs/videocontrol.md',
                    ]
                },
                {
                    title: 'Advanced',
                    collapsable: true,
                    children: [
                        '/guide/advanced/datasynchronizer.md',
                        '/guide/advanced/comchannels.md',
                        {
                            title: 'Developers',
                            collapsable: true,
                            children: [
                                '/guide/advanced/developers/datasources.md',
                                '/guide/advanced/developers/contributing.md',
                            ]
                        }
                    ]
                },
            ],
        }
    },

    /**
     * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
     */
    plugins: [
        '@vuepress/plugin-back-to-top',
        '@vuepress/plugin-medium-zoom',
        'vuepress-plugin-element-tabs'
    ]
}