const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './js/app.js',
        vendor: [
            'axios',
            'vue'
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    ],
    resolve: {
        alias: {
            axios: 'axios/dist/axios.min.js',
            vue: 'vue/dist/vue.min.js'
        }
    }
};