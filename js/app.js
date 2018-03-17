'use strict';

import Vue from 'vue';

import api from './api';

window.vm = new Vue({
    el: '#bb',
    data: {
        currencies: [],
        modules: {},
        newCurrency: {}
    },
    methods: {
        //  Currencies
        createCurrency(event) {
            let params = {
                buy: this.newCurrency.buy,
                sellHigh: this.newCurrency.sellHigh,
                sellLow: this.newCurrency.sellLow
            };
            let currency = {
                quot: this.newCurrency.quot,
                base: this.newCurrency.base,
                sum: this.newCurrency.sum,
                params: JSON.stringify(params),
                active: false
            };
            api.currencies.create(currency, response => {
                if (response.data.id) {
                    this.currencies.push(currency);
                    this.newCurrency = {};
                    $('#addCurrencyModal').modal('toggle');
                }
            });
        },
        saveCurrency(currency) {
            currency.params = JSON.stringify({
                buy: currency.buy,
                sellHigh: currency.sellHigh,
                sellLow: currency.sellLow
            });
            api.currencies.save(currency, response => {
                if (response.data !== true) {
                    console.error(response);
                }
            });
        },
        tradeCurrency(currency) {
            currency.active = true;
            this.saveCurrency(currency);
        },
        stopTradingCurrency(currency) {
            currency.active = false;
            this.saveCurrency(currency);
        },
        deleteCurrency(currency) {
            api.currencies.delete(currency.id, response => {
                if (response.data !== true) {
                    console.error(response);
                } else {
                    this.currencies.splice(this.currencies.indexOf(currency), 1);
                }
            });
        },
        tradeAll() {
            for (let currency of this.currencies) {
                this.tradeCurrency(currency);
            }
        },
        stopTradingAll() {
            for (let currency of this.currencies) {
                this.stopTradingCurrency(currency);
            }
        },

        //  Modules
        refreshModules() {
            api.modules.info(response => {
                for (let key in response.data) {
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
                let params = JSON.parse(currency.params);
                currency.buy = params.buy;
                currency.sellHigh = params.sellHigh;
                currency.sellLow = params.sellLow;
                this.currencies.push(currency);
            }
        });
    }
});