const {description} = require('../../package')
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const target = process.env.ENV === 'latest'? 'latest' : 'dev';
    console.log('Current Target release: ', target);
    return {
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
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, '../../../../showcase/dist'),
                        to: 'showcase'
                    }
                ]),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, '../../../../showcase-dev/dist'),
                        to: 'showcase-dev'
                    }
                ]),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, '../../../../jsdoc/dist-iframe'),
                        to: 'guide/api'
                    }
                ])
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
        base: `/osh-js/${target}/site/`,
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
                    ariaLabel: 'Samples',
                    items: [
                        {text: 'Showcase', link: `http://opensensorhub.github.io/osh-js/${target}/showcase/`},
                        {
                            text: 'Vue.js Video',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/video-display-vuejs/`
                        },
                        {
                            text: 'Vue.js  advanced',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/video-display-advanced-vuejs/`
                        },
                        {text: 'React UAV', link: `https://opensensorhub.github.io/osh-js/${target}/demos/3dr-solo-uav-react`},
                        {text: 'Typescript React UAV', link: `https://opensensorhub.github.io/osh-js/${target}/demos/3dr-solo-uav-react-tsx`},
                        {
                            text: 'Vue.js UAV',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/3dr-solo-uav-vuejs`
                        },
                        {
                            text: 'Earthquakes Deck.gl',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/earthquake`
                        },
                        {
                            text: 'SensorWeb API Browser',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/sweapi`
                        },
                        {
                            text: 'SensorWeb API - UAV Video Draping',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/misb`
                        },
                        {
                            text: 'SensorWeb API - UAV Tasking',
                            link: `https://opensensorhub.github.io/osh-js/${target}/demos/tasking`
                        }
                    ]
                },
                {
                    text: 'API',
                    link: `https://opensensorhub.github.io/osh-js/${target}/jsdoc/`
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
                            '/guide/protocol/general.md',
                            '/guide/datasources/batch_replayspeed.md',
                            '/guide/datasources/sos.md',
                            '/guide/datasources/sweapifetch.md',
                            {
                                title: 'SPS',
                                collapsable: true,
                                children: [
                                    '/guide/datasources/sps/datasink.md',
                                    '/guide/datasources/sps/foscamtasking.md',
                                    '/guide/datasources/sps/ptztasking.md'
                                ]
                            },
                            {
                                title: 'Others',
                                collapsable: true,
                                children: [
                                    '/guide/datasources/others/file.md',
                                ]
                            }
                        ]
                    },
                    '/guide/timesync/general.md',
                    {
                        title: 'Views',
                        collapsable: true,
                        children: [
                            '/guide/views/general.md',
                            {
                                title: 'Map',
                                collapsable: true,
                                children: [
                                    '/guide/views/map/general.md',
                                    '/guide/views/map/ol.md',
                                    '/guide/views/map/leaflet.md',
                                    '/guide/views/map/cesium.md',
                                    '/guide/views/map/deckgl.md',
                                ]
                            },
                            '/guide/views/chart.md',
                            {
                                title: 'Video',
                                collapsable: true,
                                children: [
                                    '/guide/views/video/video.md',
                                ]
                            },
                            {
                                title: 'Audio',
                                collapsable: true,
                                children: [
                                    '/guide/views/audio/audio.md'
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
                        title: 'Layers',
                        collapsable: true,
                        children: [
                            '/guide/layers/general.md',
                            '/guide/layers/marker.md',
                            '/guide/layers/polyline.md',
                            '/guide/layers/curve.md',
                            '/guide/layers/draping.md',
                            '/guide/layers/video.md',
                            '/guide/layers/audio.md',
                        ]
                    },
                    {
                        title: 'SweAPI',
                        collapsable: true,
                        children: [
                            '/guide/sweapi/general.md',
                            '/guide/sweapi/utility.md'
                        ]
                    },
                    {
                        title: 'Vue.js components',
                        collapsable: true,
                        children: [
                            '/guide/vuejs/general.md',
                            '/guide/vuejs/timecontroller.md',
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
};
