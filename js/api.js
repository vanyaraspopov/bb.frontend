'use strict';

import axios from 'axios';

const API_URI = '/api';

class Api {
    constructor() {
        this.modules = {
            info(responseHandler) {
                get('/modules', responseHandler);
            },
            start(name, responseHandler) {
                get(`/modules/start/${name}`, responseHandler);
            },
            stop(name, responseHandler) {
                get(`/modules/stop/${name}`, responseHandler);
            },
            params: {
                create(params, responseHandler) {
                    post(`/modules/params`, params, responseHandler);
                },
                delete(id, responseHandler) {
                    del(`/modules/params/${id}`, responseHandler);
                },
                deleteAll(module_id, responseHandler) {
                    del(`/modules/${module_id}/params`, responseHandler);
                },
                get(moduleId, responseHandler) {
                    get(`/modules/params/${moduleId}`, responseHandler);
                },
                save(params, responseHandler) {
                    put(`/modules/params/${params.id}`, params, responseHandler);
                }
            }
        };
        this.symbols = {
            all(responseHandler) {
                get('/symbols', responseHandler);
            },
            create(symbol, responseHandler) {
                post('/symbols', symbol, responseHandler);
            },
            delete(id, responseHandler) {
                del(`/symbols/${id}`, responseHandler);
            }
        };
    }
}

function get(uri, responseHandler) {
    request(
        axios.get(API_URI + uri),
        responseHandler
    );
}

function post(uri, params, responseHandler) {
    request(
        axios.post(API_URI + uri, params),
        responseHandler
    );
}

function put(uri, params, responseHandler) {
    request(
        axios.put(API_URI + uri, params),
        responseHandler
    );
}

function del(uri, responseHandler) {
    request(
        axios.delete(API_URI + uri),
        responseHandler
    );
}

function request(promise, responseHandler) {
    promise
        .then(responseHandler)
        .catch(error => console.error(error));
}

export default new Api();