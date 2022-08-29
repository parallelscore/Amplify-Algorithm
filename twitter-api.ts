import TwitterApi from "twitter-api-v2";
import config from "./config";

const getTweets = async (client: TwitterApi) => {
    try{
        const jsTweets = await client.v2.search('#Amplify OR #lafiaEscape', {max_results: 10});
        console.log(`jsTweets, ${JSON.stringify(jsTweets.data)}`)
        const regex = /#Amplify/i
        for await (let tweet of jsTweets) {
            const result = regex.test(tweet.text);
            // console.log(`result ${result}`); 
            if (result) {
                console.log(`tweet ${JSON.stringify(tweet.text)}`);
                console.log(`result ${result}`);
                // return JSON.stringify(tweet.text);
            }     
        }
        // regex.test(jsTweets.toString());
    }catch(error){
        console.log(`err ${error}`)
    }
    
};

const twitterAPI = async() => {
    const {api_key, api_key_secret, access_token, access_token_secret, bearer_token} = config;
    const userClient = new TwitterApi({
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