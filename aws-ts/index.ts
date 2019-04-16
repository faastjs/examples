import { faastAws } from "faastjs";
import * as funcs from "./functions";

async function main() {
    const m = await faastAws(funcs, {
        memorySize: 1728,
        timeout: 60,
        region: "us-west-1"
    });
    console.log(`## Logs`);
    console.log(`${m.logUrl()}`);
    try {
        const result = await m.functions.hello("AWS");
        console.log(`## Output`);
        console.log(result);
        console.log(`## Cost`);
        const cost = await m.costSnapshot();
        console.log(`${cost}`);
        console.log(`## Stats`);
        console.log(`${m.stats()}`);
    } finally {
        await m.cleanup();
    }
}

main();
