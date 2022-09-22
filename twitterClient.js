const {TwitterApi} = require('twitter-api-v2');
require('dotenv').config();

const Client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET_KEY,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

/**
 * Send a tweet
 * @param {string} text - The text of the tweet
 * @returns {Promise<void>}
 */
const tweet = async (text) => {
    try {
        await twitterClient.v2.tweet(text);
    } catch (error) {
        console.log(error);
    }
}

/**
 * Send a DM to a user
 * @param {string} recipientId - The user ID of the recipient
 * @param {string} text - The text of the DM
 * @returns {Promise<void>}
 */
const sendDM = async (recipientId, text) => {
    try {
        await Client.v1.sendDm({
            recipientId: recipientId,
            text: text,
        });
    } catch (error) {
        console.log(error);
    }
}

/**
 * Send a DM to yourself
 * @param {string} text - The text of the DM
 * @returns {Promise<void>}
 */
const dmSelf = async (text) => {
    sendDM(process.env.TWITTER_USER_ID, text);
}

module.exports = {
    twitterClient: Client,
    tweet: tweet,
    sendDM: sendDM,
    dmSelf: dmSelf,
}