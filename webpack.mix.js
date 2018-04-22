const mix = require('laravel-mix');

mix.options({
    publicPath: 'dist'
});

mix.js('js/app.js', 'js')
    .sourceMaps(false, 'cheap-module-eval-source-map')
    .disableNotifications();

mix.sass('css/style.scss', 'css');

mix.extract([
    'axios',
    'vue'
]);

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
        "dist/**/*.*",
    ],
    proxy: 'localhost:3000'
});