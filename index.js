const twit = require("twit")
require('dotenv').config()
const {
    DownloaderHelper
} = require('node-downloader-helper')

var T = new twit({ // grab api keys from a .env 
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

if (consumer_key = process.env.CONSUMER_KEY, consumer_secret = process.env.CONSUMER_SECRET) {
    console.log("Sanity test checked. If returns error, set your API keys and such in a .env file please.")
} else {
    return
}

getImageFromAcc("@")
getImageFromAcc("@")
// turned this into a function, looks cleaner this way and you can add more accounts for the future

function getImageFromAcc(args) {
    T.get('search/tweets', {
        q: args,
        count: 100
    }, function (err, data, response) {
        var i;
        for (i = 0; i < 99; i++) {
            if (!data.statuses[i].extended_entities) {
                console.log("empty")
            } else {
                console.log(data.statuses[i].extended_entities.media[0].media_url) // grab url from a array
                var dl = new DownloaderHelper(data.statuses[i].extended_entities.media[0].media_url, './folder', { // download image from url
                    override: true
                })
                dl.on('end', () => console.log("downloaded image")) // message
                dl.start();
            }
        }
    })
}