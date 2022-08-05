import { faastAws } from "faastjs";
import * as funcs from "./functions";
import { writeFileSync } from "fs";

async function main() {
    const m = await faastAws(funcs, {
        memorySize: 1728,
        timeout: 180,
        packageJson: {
            dependencies: {
                "chrome-aws-lambda": "^10.1.0",
                "puppeteer-core": "^10.1.0"
            }
        }
    });
    try {
        const rv = await m.functions.runPuppeteer("https://example.com");
        console.log(rv.title);
        writeFileSync("output.png", rv.screenshot);
        console.log(`wrote output.png`);
    } finally {
        await m.cleanup();
    }
}

main();
