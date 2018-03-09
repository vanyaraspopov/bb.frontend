'use strict';

import axios from 'axios';
import Vue from 'vue';

const API_URI = '/api';

window.vm = new Vue({
    el: '#bb',
    data: {
        currencies: [],
        modules: {}
    },
    methods: {
        currencySubmit(event){
            alert('submit');
            let form = event.target;
            let data = new FormData(form);
            currencySubmit(data);
        },
        refreshModules() {
            refreshModules(this);
        }
    },
    mounted() {
        refreshModules(this);
        axios.get(`${API_URI}/currencies`)
            .then(response => {
                for (let currency of response.data) {
                    this.currencies.push(currency);
                }
            })
            .catch(err => console.error(err));
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

function currencySubmit(data) {
    axios.get('/', data);
}