module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: './js/app.js',
    output: {
        filename: 'app.bundle.js'
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
    resolve: {
        alias: {
            axios: 'axios/dist/axios.min.js',
            vue: 'vue/dist/vue.min.js'
        }
    },
    watch: false
};