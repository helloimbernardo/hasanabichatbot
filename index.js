// Dependecies
const tmi = require("tmi.js");
const twitterClient = require('./twitterClient.js');
const accessSecret = require('./secrets.js');

// Streamers JSON List
const streamerList = require('./streamerList.json').map((streamer) => streamer.toLowerCase());
// streamerList = streamerList.map((streamer) => streamer.toLowerCase());
//-- -- actual code -- --

const twitchClient = new tmi.client({
    identity: {
        username: await accessSecret('TWITCH_BOT_USERNAME'),
        password: await accessSecret('TWITCH_OAUTH_TOKEN'),
    },
    channels: ["hasanabi"],
});

twitchClient.on("message", onMessageHandler);
twitchClient.on("connected", onConnectedHandler);
twitchClient.on("raided", onRaidHandler);

twitchClient.connect();

const tweet = async (text) => {
  try {
      await twitterClient.v2.tweet(text);
  } catch (error) {
    console.log(error);
  }
}

function onMessageHandler(target, context, msg, self) {
    let message = {
        username: context['display-name'].toLowerCase(),
        txt: msg,
        ch: target.slice(1).toLowerCase(),
    }
    if (message.ch === "hasanabi" && streamerList.includes(message.username)) {
        // console.log(`[🔴${message.ch}] ${message.username}: ${message.txt}`);
        tweet(`[🔴${message.ch}] ${message.username}: ${message.txt}`).then(r => console.log(r));
    }
}

function onRaidHandler(channel, username, viewers) {
    if ((channel === "hasanabi") && (streamerList.includes(username) || viewers >= 150)) {
        // console.log(`[🔴${channel}] ${username} just raided with ${viewers} viewers!`);
        tweet(`[🔴${channel}] ${username} just raided with ${viewers} viewers!`).then(r => console.log(r));
    }
}

function onConnectedHandler(addr, port) {
    console.log(`%c * Connected to ${addr}:${port}`, "background-color: green; color: white;");
}