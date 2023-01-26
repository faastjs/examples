import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

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
