import { faast } from "faastjs";
import * as funcs from "./functions";
import { writeFileSync } from "fs";

async function main() {
    const m = await faast("aws", funcs, {
        memorySize: 1728,
        packageJson: {
            dependencies: {
                "chrome-aws-lambda": "latest",
                "puppeteer-core": "latest"
            }
        }
    });
    try {
        const rv = await m.functions.runPuppeteer("https://example.com");
        console.log(rv.title);
        const buf = Buffer.from(rv.screenshot, "base64");
        writeFileSync("output.png", buf);
        console.log(`wrote output.png`);
    } finally {
        await m.cleanup();
    }
}

main();
