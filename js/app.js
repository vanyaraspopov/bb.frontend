'use strict';

import $ from 'jquery';
import bootstrap from './vendor/bootstrap.min';
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