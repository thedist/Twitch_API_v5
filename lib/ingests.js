'use strict';

const request = require('./request');

module.exports = {
    serverList: callback => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: none

        let options = {};
        options.url = `https://api.twitch.tv/kraken/ingests`;

        request('GET', options, callback);
    }
};