'use strict';
const request = require('request');
let index = require('../index');

module.exports = (method, data, callback) => {
    require('request').debug = index.debug;

    let clientID = index.clientID;
    if(!clientID || clientID === '') return callback('No client id specified');
    
    let options = {
        url: data.url,
        method: method,
        form: data.form,
        headers: {
            'Client-ID': clientID,
            'Accept': 'application/vnd.twitchtv.v5+json',
            'Content-Type': 'application/json',
            'Authorization': data.auth || ''
        }
    };

    // Headers for v4 API (clips and video upload)
    if(data.v4) options.headers.Accept = 'application/vnd.twitchtv.v4+json';
    if(data['content-length']) {
        options.encoding = null;
        options.headers['content-length'] = data['content-length'];
    }

    if(options.headers.Authorization != '' && options.headers.Authorization.indexOf('OAuth') === -1) {
        options.headers.Authorization = 'OAuth ' + data.auth;
    }

    request(options, (err, res, body) => {
        if(err) return callback(err);
        try {
            if(body.length === 0) return callback({ statusCode: res.statusCode });
            callback(null, JSON.parse(body));
        }
        catch(err) {
            err.statusCode = res.statusCode;
            callback(err);
        }
    });
};
