const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExampleBuilder = require('./example-builder');
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..');

const examples = fs.readdirSync(src)
    .filter(name => /^(?!index).*\.html$/.test(name))
    .map(name => name.replace(/\.html$/, ''));

const entry = {};
examples.forEach(example => {
    entry[example] = `./${example}.js`;
});

module.exports = {
    context: src,
    target: 'web',
    entry: entry,
    stats: 'minimal',
    module: {
        rules: [{
            test: /^((?!es2015-)[\s\S])*\.js$/,
            use: {
                loader: 'buble-loader'
            },
            include: [
                path.join(__dirname, '..', '..', 'src'),
                path.join(__dirname, '..')
            ]
        }, {
            test: /\.js$/,
            use: {
                loader: path.join(__dirname, './worker-loader.js')
            },
            include: [
                path.join(__dirname, '../../Toolkit/src/osh/workers')
            ]
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
            ],
        }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                // Do not minify examples that inject code into workers
                exclude: [/(color-manipulation|region-growing|raster)\.js/]
            })
        ],
        runtimeChunk: {
            name: 'common'
        },
        splitChunks: {
            name: 'common',
            chunks: 'initial',
            minChunks: 2
        }
    },
    plugins: [
        new ExampleBuilder({
            templates: path.join(__dirname, '..', 'templates'),
            common: 'common'
        }),
        new CopyPlugin([
            {from: '../../Toolkit/src/css/osh.css', to: 'css'},
            {from: '../../Toolkit/src/images/*', to: './images', flatten: true},
            {from: '../../Toolkit/src/css/font-awesome-4.6.3', to: './css/font-awesome-4.6.3/', flatten: false},
            {from: 'images', to: 'images'},
            {from: 'pretiffy.js', to: 'pretiffy.js'},
            {from: 'index.html', to: 'index.html'}
        ])
    ],
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', '..', 'build', 'Showcase')
    },
    node: {
        fs: 'empty'
    },
    resolve: {
        alias: {
            // allow imports from 'osh/module' instead of specifiying the source path
            osh: path.join(__dirname, '..', '..', 'src', 'osh')
        }
    }
};
