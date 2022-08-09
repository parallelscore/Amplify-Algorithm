import puppeteer from 'puppeteer';

let main_actual = async () => {
    try{
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        const URL = 'https://twitter.com/login';
        await page.setViewport({
            width: 1280, height: 800,
            deviceScaleFactor: 1
        });
        await page.goto(URL, {waitUntil: 'networkidle2'});
    }catch (e) {
        console.log(e);
    }
};

let main = async () => {
    await main_actual();
}