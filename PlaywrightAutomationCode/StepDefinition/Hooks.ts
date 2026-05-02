import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { chromium, Browser, BrowserContext, Page } from '@playwright/test';
import { pageFixture } from '../hooks/pageFixture';

let browser: Browser;
let context: BrowserContext;
let page: Page;

// Launch browser once
BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

// Create new page for each scenario
Before(async () => {
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

    // ✅ Close ONLY after scenario completes
    if (context) {
        await context.close();
    }
});

// Close browser at end
AfterAll(async () => {
    if (browser) {
        await browser.close();
    }
});