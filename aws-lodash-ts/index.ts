import { faast } from "faastjs";
import * as funcs from "./functions";

async function main() {
    const m = await faast("aws", funcs);
    try {
        const input = [0, 1, 2];
        const result = await m.functions.square(input);
        console.log(`square([${input}]) = [${result}]`);
    } finally {
        await m.cleanup();
    }
}

main();
