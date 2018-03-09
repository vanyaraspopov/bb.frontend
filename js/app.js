'use strict';

import Vue from 'vue';

const API_URI = '/api';

let vm = new Vue({
    el: '#bb',
    data: {
    },
    mounted() {
        $.ajax(API_URI + '/modules');

    }
});