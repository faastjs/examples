const { faastGoogle } = require("faastjs");
const funcs = require("./functions");

async function main() {
    const m = await faastGoogle(funcs, {
        memorySize: 1024,
        timeout: 60,
        region: "us-central1"
    });
    console.log(`## Logs`);
    console.log(`${m.logUrl()}`);
    try {
        const result = await m.functions.hello("GCP");
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
