"use strict";
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const twitter_api_v2_1 = __importDefault(require("twitter-api-v2"));
const config_1 = __importDefault(require("./config"));
const getTweets = async (client) => {
    var e_1, _a;
    try {
        const jsTweets = await client.v2.search('#Amplify OR #lafiaEscape', { max_results: 10 });
        console.log(`jsTweets, ${JSON.stringify(jsTweets.data)}`);
        const regex = /#Amplify/i;
        try {
            for (var jsTweets_1 = __asyncValues(jsTweets), jsTweets_1_1; jsTweets_1_1 = await jsTweets_1.next(), !jsTweets_1_1.done;) {
                let tweet = jsTweets_1_1.value;
                const result = regex.test(tweet.text);
                // console.log(`result ${result}`); 
                if (result) {
                    console.log(`tweet ${JSON.stringify(tweet.text)}`);
                    console.log(`result ${result}`);
                    // return JSON.stringify(tweet.text);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (jsTweets_1_1 && !jsTweets_1_1.done && (_a = jsTweets_1.return)) await _a.call(jsTweets_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // regex.test(jsTweets.toString());
    }
    catch (error) {
        console.log(`err ${error}`);
    }
};
const twitterAPI = async () => {
    const { api_key, api_key_secret, access_token, access_token_secret, bearer_token } = config_1.default;
    const userClient = new twitter_api_v2_1.default({
        appKey: api_key,
        appSecret: api_key_secret,
        accessToken: access_token,
        accessSecret: access_token_secret,
    });
    const tweet = await getTweets(userClient);
    console.log(`tweets ${tweet}`);
};
// twitterAPI()
// export default twitterAPI;
