import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, firefox, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

let chromeBrowser: Browser;
let edgeBrowser: Browser;
let firefoxBrowser: Browser;
let browser: Browser;

let context: BrowserContext;
let page: Page;
let isBrowserLaunched = false;

// 👉 simple variable (NO process, NO globalThis)
let browserName = 'chrome';

// Launch browsers once
BeforeAll(async () => {
if (isBrowserLaunched) return; // 👈 prevents double launch
    // const [chrome, fire] = await Promise.all([
    //     chromium.launch({
    //         channel: 'chrome',
    //         headless: false
    //     }),

    //     firefox.launch({
    //         //channel: 'msedge',
    //         headless: false
    //     })

    browser = await chromium.launch({
        channel: 'chrome',
        headless: false
    });
    //chromeBrowser = chrome;
    //firefoxBrowser = fire;
    isBrowserLaunched = true;

});


// Create new page for each scenario
Before(async () => {

    // const browser =
    //     browserName === 'ff' ? firefoxBrowser : chromeBrowser;
    context = await browser.newContext();
    page = await context.newPage();

    pageFixture.page = page;
});

// After each scenario
After(async function ({ result }) {

    if (result?.status === Status.FAILED && page) {
        const img = await page.screenshot();
        await this.attach(img, 'image/png');
    }

    await context?.close();
});

// Close browser at end
AfterAll(async () => {

    //await chromeBrowser?.close();
    //await firefoxBrowser?.close();
    await browser.close();

});