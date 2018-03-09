'use strict';

import axios from 'axios';
import Vue from 'vue';

const API_URI = '/api';

window.vm = new Vue({
    el: '#bb',
    data: {
        modules: {}
    },
    methods: {
        refreshModules() {
            refreshModules(this);
        }
    },
    mounted() {
        refreshModules(this);
    }
});

function refreshModules(vm) {
    axios.get(`${API_URI}/modules`)
        .then(response => {
            for (var key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                    Vue.set(vm.modules, key, response.data[key])
                }
            }
        })
        .catch(error => console.error(error));
}