import * as puppeteer from "puppeteer-core";
import * as chromium from "chrome-aws-lambda";

export async function runPuppeteer(url: string) {
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
    });
    try {
        let page = await browser.newPage();
        await page.goto(url);
        const title = await page.title();
        const screenshot = await page.screenshot({ encoding: "binary" });
        return { title, screenshot };
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
}
