import { faastAws } from "faastjs";
import * as funcs from "./functions";
import { writeFileSync } from "fs";

async function main() {
    const m = await faastAws(funcs, {
        memorySize: 1728,
        awsLambdaOptions: {
            // chrome-aws-lambda only works with node8.10 for now.
            Runtime: "nodejs8.10"
        },
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
        writeFileSync("output.png", rv.screenshot);
        console.log(`wrote output.png`);
    } finally {
        await m.cleanup();
    }
}

main();
