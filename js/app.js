'use strict';

import axios from 'axios';
import Vue from 'vue';

const API_URI = '/api';

window.vm = new Vue({
    el: '#bb',
    data: {
        modules: {}
    },
    mounted() {
        axios.get(`${API_URI}/modules`)
            .then(response => {
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        this.modules[key] = response.data[key];
                    }
                }
            })
            .catch(error => console.error(error));
    }
});