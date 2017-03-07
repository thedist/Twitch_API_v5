'use strict';

const request = require('./request');
const querystring = require('querystring');

module.exports = {
    create: (data, callback) => {
        // Authentication: channel_editor
        // Required Parameters: channelName, title
        // Optional Parameters: description, tags

        if(!data.auth) return callback('auth is required');
        if(!data.channelName) return callback('channelName is required');
        if(!data.title) return callback('title is required');

        let options = {};
        options.url = `https://api.twitch.tv/kraken/videos`;
        options.auth = data.auth;
        options.form = { channel_name: data.channel_name, title: data.title, description: data.description, tags: data.tags };

        request('POST', options, callback);
    },

    upload: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID, part, uploadToken, videoData, contentLength
        // Optional Parameters: none

        if(!data.videoID) return callback('videoID is required');
        if(!data.part) return callback('part is required');
        if(!data.uploadToken) return callback('uploadToken is required');
        if(!data.videoData) return callback('videoData is required');
        if(!data.contentLength) return callback('contentLength is required');

        let params = {};
        params.part = data.part;
        params.uploadToken = data.uploadToken;

        let options = {};
        options.url = `https://uploads.twitch.tv/upload/${data.videoID}?${querystring.stringify(params)}`;
        options.content_length = data.contentLength;
        options.body = videoData;

        request('GET', options, callback);
    },

    complete: (data, callback) => {
        // Authentication: none
        // Required Parameters: videoID, uploadToken
        // Optional Parameters: none

        if(!data.videoID) return callback('videoID is required');
        if(!data.uploadToken) return callback('uploadToken is required');

        let params = {};
        params.uploadToken = data.uploadToken;

        let options = {};
        options.url = `https://uploads.twitch.tv/upload/${data.videoID}/complete?${querystring.stringify(params)}`;

        request('POST', options, callback);
    }
};