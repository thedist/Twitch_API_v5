'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    channel: (data, callback) => {
        // Authentication: channel_read
        // Required Parameters: none
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channel`;
        options.auth = data.auth;
        
        request('GET', options, callback);
    },

    channelByID: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}`;

        request('GET', options, callback);
    },
        
    updateChannel: (data, callback) => {
        // Authentication: channel_editor (updating delay or channel_feed_enabled requires channel owner OAuth)
        // Required Parameters: channelID, at least one of status, game, delay or channel_feed_enabled
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.status && !data.game && !data.delay && !data.channel_feed_enabled) return callback('at least one of status, game, delay or channel_feed_enabled is required');

        let update = {};
        if(data.status) update.status = data.status;
        if(data.game) update.game = data.game;
        if(data.delay) update.delay = data.delay;
        if(data.channel_feed_enabled) update.channel_feed_enabled = data.channel_feed_enabled;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}`;
        options.auth = data.auth;
        options.form = { channel: update };

        request('PUT', options, callback);
    },

    editors: (data, callback) => {
        // Authentication: channel_read
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/editors`;
        options.auth = data.auth;

        request('GET', options, callback);
    },

    followers: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: limit, offset, cursor, direction
        
        if(!data.channelID) return callback('channelID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.offset) params.offset = data.offset;
        if(data.cursor) params.cursor = data.cursor;
        if(data.direction) params.direction = data.direction;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/follows?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    teams: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/teams`;

        request('GET', options, callback);
    },

    subs: (data, callback) => {
        // Authentication: channel_subscriptions
        // Required Parameters: channelID
        // Optional Parameters: limit, offset, direction

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.offset) params.offset = data.offset;
        if(data.direction) params.direction = data.direction;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/subscriptions?${querystring.stringify(params)}`;
        options.auth = data.auth;

        request('GET', options, callback);
    },

    checkSub: (data, callback) => {
        // Authentication: channel_check_subscription
        // Required Parameters: channelID, userID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.userID) return callback('userID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/subscriptions/${data.userID}`;
        options.auth = data.auth;

        request('GET', options, callback);

    },

    videos: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: limit, offset, broadcast_type, language, sort

        if(!data.channelID) return callback('channelID is required');

        let params = {};
        if(data.limit) params.limit = data.limit;
        if(data.offset) params.offset = data.offset;
        if(data.broadcast_type) params.broadcast_type = data.broadcast_type;
        if(data.language) params.language = data.language;
        if(data.sort) params.sort = data.sort;

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/videos?${querystring.stringify(params)}`;

        request('GET', options, callback);
    },

    startAd: (data, callback) => {
        // Authentication: channel_commercial
        // Required Parameters: channelID, duration
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.duration) return callback('duration is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/commercial`;
        options.auth = data.auth;
        options.form = { duration: data.duration };

        request('POST', options, callback);
    },

    resetStreamKey: (data, callback) => {
        // Authentication: channel_stream
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/stream_key`;
        options.auth = data.auth;

        request('DELETE', options, callback);
    },

    getCommunity: (data, callback) => {
        // Authentication: none
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/community`;

        request('GET', options, callback);
    },
        
    setCommunity: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: channelID, communityID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');
        if(!data.communityID) return callback('communityID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/community/${data.communityID}`;
        options.auth = data.auth;

        request('PUT', options, callback);
    },
        
    leaveCommunity: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: channelID
        // Optional Parameters: none

        if(!data.auth) return callback('auth is required');
        if(!data.channelID) return callback('channelID is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/channels/${data.channelID}/community`;

        request('DELETE', options, callback);
    }
};