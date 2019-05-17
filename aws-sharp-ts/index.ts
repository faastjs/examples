import { faast } from "faastjs";
import * as funcs from "./functions";
import { writeFileSync } from "fs";

async function main() {
    const m = await faast("aws", funcs, {
        packageJson: {
            dependencies: {
                sharp: "latest"
            }
        }
    });
    try {
        const rv = await m.functions.runSharp();
        writeFileSync("output.png", rv);
        console.log(`wrote output.png`);
    } finally {
        await m.cleanup();
    }
}

main();
