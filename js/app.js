'use strict';

import Vue from 'vue';

import api from './api';

let moduleParametersDefaults = {
    'bb.data-collector': {
        symbol: null,
        params: {}
    },
    'bb.trader': {
        symbol: null,
        params: {
            sum: {
                title: 'Сумма ордера',
                value: 0.002
            },
            buy: {
                title: 'Коэфф. для покупки',
                value: 5
            },
            sellHigh: {
                title: 'Коэфф. для продажи (верх), %',
                value: 20
            },
            sellLow: {
                title: 'Коэфф. для продажи (низ), %',
                value: 2
            }
        }
    },
    'bb.scalper': {
        symbol: null,
        params: {
            sum: {
                title: 'Сумма ордера',
                value: 0.002
            },
            period: {
                title: 'Длина периода, мин',
                value: 60
            },
            subsidence: {
                title: 'Проседание цены для покупки, %',
                value: 0.5
            },
            sellHigh: {
                title: 'Коэфф. для продажи (верх), %',
                value: 0.5
            },
            sellLow: {
                title: 'Коэфф. для продажи (низ), %',
                value: 2
            }
        }
    }
};

window.vm = new Vue({
    el: '#bb',
    data: {
        modules: {},
        symbols: [],
        moduleParametersDefaults: moduleParametersDefaults,
        newSymbol: {},
        newModuleParameters: Object.assign({}, moduleParametersDefaults),
    },
    methods: {
        //  Modules
        createModuleParameters(moduleName) {
            let mp = {
                module_id: this.modules[moduleName].id,
                symbol_id: this.newModuleParameters[moduleName].symbol.id,
                params: this.newModuleParameters[moduleName].params,
            };
            api.modules.params.create(mp, response => {
                if (response.data.id) {
                    mp = response.data;
                    mp.params = JSON.parse(mp.params);
                    this.modules[moduleName].params.push(mp);
                    this.newModuleParameters = Object.assign({}, moduleParametersDefaults);
                    $('#addParams' + this.hash(moduleName)).modal('toggle');
                }
            });
        },
        saveModuleParameters(moduleParameters) {
            api.modules.params.save(moduleParameters, response => {
                if (response.data !== true) {
                    console.error(response);
                }
            });
        },
        deleteModuleParameters(module, moduleParameters) {
            let confirmed = confirm(`Действительно удалить валюту ${moduleParameters.symbol.symbol}?`);
            if (confirmed) {
                api.modules.params.delete(moduleParameters.id, response => {
                    if (response.data !== true) {
                        console.error(response);
                    } else {
                        module.params.splice(module.params.indexOf(moduleParameters), 1);
                    }
                });
            }
        },
        refreshModules() {
            api.modules.info(response => {
                for (let key in response.data) {
                    if (response.data.hasOwnProperty(key)) {
                        for (let params of response.data[key].params) {
                            params.params = JSON.parse(params.params);
                        }
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
        },

        //  Symbols
        createSymbol(event) {
            let symbol = {
                quot: this.newSymbol.quot,
                base: this.newSymbol.base
            };
            api.symbols.create(symbol, response => {
                if (response.data.id) {
                    symbol.id = response.data.id;
                    this.symbols.push(symbol);
                    this.newSymbol = {};
                    $('#addSymbolModal').modal('toggle');
                }
            });
        },
        deleteSymbol(symbol) {
            let confirmed = confirm(`Действительно удалить валюту ${symbol.quot}${symbol.base}?`);
            if (confirmed) {
                api.symbols.delete(symbol.id, response => {
                    if (response.data !== true) {
                        console.error(response);
                    } else {
                        this.symbols.splice(this.symbols.indexOf(symbol), 1);
                        this.refreshModules();
                    }
                });
            }
        },
        activateAll(module) {
            for (let parameters of module.params) {
                parameters.active = true;
                this.saveModuleParameters(parameters);
            }
        },
        deactivateAll(module) {
            for (let parameters of module.params) {
                parameters.active = false;
                this.saveModuleParameters(parameters);
            }
        },
        includeAll(module) {
            let moduleName = module.pm2_name;
            let allSymbols = this.symbols.map(s => s.id);
            let includedSymbols = module.params.map(p => p.symbol_id);
            for (let symbol_id of allSymbols) {
                if (includedSymbols.includes(symbol_id)) continue;
                let mp = {
                    symbol_id,
                    module_id: module.id,
                    params: Object.assign({}, this.moduleParametersDefaults[moduleName].params)
                };
                api.modules.params.create(mp, response => {
                    if (response.data.id) {
                        mp = response.data;
                        mp.params = JSON.parse(mp.params);
                        this.modules[moduleName].params.push(mp);
                    }
                });
            }
        },

        //  Utils
        hash(s) {
            /* Simple hash function. */
            let a = 1, c = 0, h, o;
            if (s) {
                a = 0;
                /*jshint plusplus:false bitwise:false*/
                for (h = s.length - 1; h >= 0; h--) {
                    o = s.charCodeAt(h);
                    a = (a << 6 & 268435455) + o + (o << 14);
                    c = a & 266338304;
                    a = c !== 0 ? a ^ c >> 21 : a;
                }
            }
            return String(a);
        }
    },
    mounted() {
        this.refreshModules();

        api.symbols.all(response => {
            for (let symbol of response.data) {
                this.symbols.push(symbol);
            }
        });
    }
});