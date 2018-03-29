const mix = require('laravel-mix');

mix.options({
    publicPath: 'dist'
});

mix.js('js/app.js', 'js')
    .extract([
        'axios',
        'vue'
    ])
    .sourceMaps(false, 'cheap-module-eval-source-map')
    .disableNotifications();

mix.webpackConfig({
    resolve: {
        alias: {
            'axios$': 'axios/dist/axios.min.js',
            'vue$': 'vue/dist/vue.min.js'
        }
    }
});

mix.browserSync({
    files: [
        "./*.html",
        "dist/js/*.js",
        "css/*.css"
    ],
    proxy: 'localhost:3000'
});