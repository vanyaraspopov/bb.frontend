'use strict';

import Vue from 'vue';

import api from './api';

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
        },
        refreshModules() {
            api.modules.info(response => {
                for (var key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        Vue.set(this.modules, key, response.data[key])
                    }
                }
            });
        },
        startModule(name) {
            api.modules.start(name, response => {
                this.refreshModules();
            });
        },
        stopModule(name) {
            api.modules.stop(name, response => {
                this.refreshModules();
            });
        }
    },
    mounted() {
        this.refreshModules();

        api.currencies.all(response => {
            for (let currency of response.data) {
                this.currencies.push(currency);
            }
        });
    }
});