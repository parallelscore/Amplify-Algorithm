"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
const dayjs_1 = __importDefault(require("dayjs"));
const { username, password } = config_1.default;
const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};
const sleep_for = async (page, min, max) => {
    let sleep_duration = randomIntFromInterval(min, max);
    console.log('waiting for ', sleep_duration / 1000, 'seconds');
    await page.waitForTimeout(sleep_duration);
};
const authenticatePageOne = async (page) => {
    try {
        // $x(`//div[@aria-label="Timeline: Search timeline"]//div[@style="position: relative; min-height: 3814.33px"]`)
        // const usernameInput = await page.$x('//input[@name="username"]');
        console.log(username);
        console.log(password);
        const usernameInput = await page.$x('//input[@name="text"]');
        if (usernameInput.length > 0) {
            await usernameInput[0].focus();
            await page.keyboard.type(username);
        }
        const nextButton = await page.$x(`//div[@role='button']//span[text()='Next']`);
        if (nextButton.length > 0) {
            await nextButton[0].click();
        }
    }
    catch (error) {
        console.log('Error in Auth: ', error);
    }
};
const authenticatePageTwo = async (page) => {
    try {
        const passwordInput = await page.$x(`//input[@name="password"]`);
        if (passwordInput.length > 0) {
            await passwordInput[0].focus();
            await page.keyboard.type(password);
        }
        const loginButton = await page.$x(`//div[@role='button']//span[text()='Log in']`);
        if (loginButton.length > 0) {
            await loginButton[0].click();
        }
    }
    catch (error) {
        console.log('Error in Auth2: ', error);
    }
};
const searchFunction = async (page, searchWord) => {
    try {
        const searchInput = await page.$x('//input[@data-testid="SearchBox_Search_Input"]');
        if (searchInput.length > 0) {
            await searchInput[0].focus();
            await page.keyboard.type(searchWord);
        }
    }
    catch (error) {
        console.log('Error with search', error);
    }
};
const scrapeScrollItems = async (page, targetLength) => {
    try {
        const tweetArray = [];
        while (targetLength <= 40) {
            const tweets = await page.$x(`//div[@aria-label="Timeline: Search timeline"]//div[@data-testid="cellInnerDiv"]/div/div/div/article/div/div/div[1]/div[2]/div[2]/div[2]/div[1]`);
            const datesPosted = await page.$x(`//div[@aria-label="Timeline: Search timeline"]//div[@data-testid="cellInnerDiv"]/div/div/div/article/div/div/div[1]/div[2]/div[2]/div[1]/div/div/div/div/div/div[2]/div/div[3]/a/time`);
            console.log('length', tweets.length);
            console.log('length', datesPosted.length);
            if (tweets.length > 0) {
                for (let i = 0; i <= (tweets.length - 1); i++) {
                    try {
                        let tweetData = {};
                        const tweet = await page.evaluate(el => el.innerText, tweets[i]);
                        let datePosted = await page.evaluate(el => el.getAttribute("datetime"), datesPosted[i]);
                        datePosted = (0, dayjs_1.default)(datePosted).add(1, 'hour').toDate();
                        tweetData.tweet = tweet;
                        tweetData.datePosted = datePosted;
                        console.log('datePosted', datePosted);
                        console.log('tweet', tweet);
                        tweetArray.push(tweetData);
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                ;
            }
            fs_1.default.appendFile('tweets.json', JSON.stringify(tweetArray), (err) => {
                if (err)
                    throw err;
                console.log('The data was appended to file!');
            });
            console.log('tweetData', tweetArray);
            const previousHeight = await page.evaluate('document.body.scrollHeight');
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForFunction(`document.body.scrollHeight > ${previousHeight}`);
            await new Promise((resolve) => setTimeout(resolve, 800));
        }
    }
    catch (error) {
        console.log('error scolling', error);
    }
};
const navigateToPage = async (page, URL, search, getData) => {
    try {
        const tweetArray = [];
        await page.goto(URL, { waitUntil: 'networkidle2' });
        await sleep_for(page, 1000, 2000);
        if (search) {
            await searchFunction(page, '#lafiaEscape');
        }
        if (getData) {
            scrapeScrollItems(page, 35);
        }
    }
    catch (error) {
        console.log('Error navigating to page', error);
    }
};
let main_actual = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        const URL = 'https://twitter.com/i/flow/login';
        await page.setViewport({
            width: 1280, height: 600,
            deviceScaleFactor: 1
        });
        await page.goto(URL, { waitUntil: 'networkidle2' });
        await sleep_for(page, 1000, 2000);
        await authenticatePageOne(page);
        await sleep_for(page, 500, 1000);
        await authenticatePageTwo(page);
        await sleep_for(page, 500, 1000);
        await navigateToPage(page, 'https://twitter.com/home', true, false);
        await sleep_for(page, 500, 1000);
        await navigateToPage(page, 'https://twitter.com/search?q=%23lafiaEscape&src=typed_query&f=live', false, true);
    }
    catch (e) {
        console.log(e);
    }
};
let main = async () => {
    await main_actual();
};
// main();
