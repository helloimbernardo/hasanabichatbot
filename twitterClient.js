const {TwitterApi} = require('twitter-api-v2');
const accessSecret = require('./secrets.js');

const Client = new TwitterApi({
    appKey: await accessSecret('TWITTER_API_KEY'),
    appSecret: await accessSecret('TWITTER_API_SECRET_KEY'),
    accessToken: await accessSecret('TWITTER_ACCESS_TOKEN'),
    accessSecret: await accessSecret('TWITTER_ACCESS_TOKEN_SECRET'),
});

const rwClient = Client.readWrite;

module.exports = rwClient;
