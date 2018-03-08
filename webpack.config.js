module.exports = {
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
            vue: 'vue/dist/vue.js'
        }
    },
    watch: false
};