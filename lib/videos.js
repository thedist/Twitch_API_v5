'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    getVideo: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID
        // Optional Parameters: none

        if(!data.videoID) return callback('videoID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/${data.videoID}`;

        request('GET', options, callback);
    },

    top: (data, callback) => {
        // Authentication: none
        // Required Parameters: none
        // Optional Parameters: limit, offset, game, period, broadcast_type

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.offset) params.offset = data.offset;
        if(data.game) params.game = data.game;
        if(data.period) params.period = data.period;
        if(data.broadcast_type) params.broadcast_type = data.broadcast_type;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/top?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    followed: (data, callback) => {
        // Authentication: user_read
        // Required Parameters: none
        // Optional Parameters: limit, offset, broadcast_type

        if(!data.auth) return callback('auth is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.offset) params.offset = data.offset;
        if(data.broadcast_type) params.broadcast_type = data.broadcast_type;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos/followed`;
        options.auth = data.auth;

        request('GET', options, callback);
    },
};