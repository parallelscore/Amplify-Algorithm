"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
let main_actual = async () => {
    try {
        const browser = await puppeteer_1.default.launch({ headless: false });
        const page = await browser.newPage();
        const URL = 'https://twitter.com/login';
        await page.setViewport({
            width: 1280, height: 800,
            deviceScaleFactor: 1
        });
        await page.goto(URL, { waitUntil: 'networkidle2' });
    }
    catch (e) {
        console.log(e);
    }
};
let main = async () => {
    await main_actual();
};
