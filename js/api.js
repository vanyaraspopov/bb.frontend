'use strict';

import axios from 'axios';

const API_URI = '/api';

class Api {
    constructor() {
        this.currencies = {
            all(responseHandler) {
                get('/currencies', responseHandler);
            }
        };
        this.modules = {
            info(responseHandler) {
                get('/modules', responseHandler);
            },
            start(name, responseHandler) {
                get(`/modules/start/${name}`, responseHandler);
            },
            stop(name, responseHandler) {
                get(`/modules/stop/${name}`, responseHandler);
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

function request(promise, responseHandler) {
    promise
        .then(responseHandler)
        .catch(error => console.error(error));
}

export default new Api();