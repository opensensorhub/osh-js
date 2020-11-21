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
    description: description,

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
        sidebar: 'auto',
        nav: [
            {
                text: 'Guide',
                link: '/guide/',
            },
            {
                text: 'Config',
                link: '/config/'
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
                        }
                    ]
                },
                '/guide/datasynchronizer/general.md',
                {
                    title: 'Views',
                    collapsable: true,
                    children: []
                },
                {
                    title: 'Vue.js components',
                    collapsable: true,
                    children: []
                },
                {
                    title: 'Advanced',
                    collapsable: true,
                    children: [
                        '/guide/advanced/datasynchronizer.md'
                    ]
                },
                {
                    title: 'API',
                    collapsable: true,
                    sidebarDepth: 0,
                    children: [
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
        '@vuepress/plugin-medium-zoom'
    ]
}
