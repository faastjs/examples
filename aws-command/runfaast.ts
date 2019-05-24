import { faast } from "faastjs";
import { existsSync } from "fs";
import { resolve } from "path";
import * as funcs from "./functions";

function help() {
    console.log(`Usage: node dist/runfaast.js [options] <command> [args...]

Run a command on lambda using faast.js

Options:
  -d, --dir <dir>   Send a directory to the lambda function and make it available 
                    in the current working directory in the cloud function.
  -l, --local       Run the command locally instead of on AWS.
  -h, --help        Output usage information`);
    process.exit(0);
}

(async () => {
    const [, , ...args] = process.argv;
    let dir = undefined;
    let local = false;
    if (args.length === 0) {
        help();
    }
    while (args.length > 0 && args[0].startsWith("-")) {
        switch (args[0]) {
            case "-d":
            case "--dir":
                args.shift();
                dir = args.shift()!;
                break;

            case "-l":
            case "--local":
                args.shift();
                local = true;
                break;

            case "-h":
            case "--help":
                help();
        }
    }
    if (args.length === 0) {
        help();
    }
    const command = args.join(" ");

    let resolvedDir = undefined;
    if (dir) {
        resolvedDir = resolve(dir);
        if (dir && !existsSync(dir)) {
            console.log(`Could not find directory '${dir}'`);
            process.exit(-1);
        }
    }

    console.log(`Command: '${command}'`);
    console.log(`Dir: ${resolvedDir}`);
    console.log(`Cwd: ${process.cwd()}`);

    console.log(`Creating cloud function.`);
    const provider = local ? "local" : "aws";
    const m = await faast(provider, funcs, {
        memorySize: 1728,
        timeout: 600,
        include: [resolvedDir]
    });
    console.log(`Logs: ${m.logUrl()}`);
    try {
        const result = await m.functions.exec(command);
        console.log(`Output:`);
        console.log(result);
        const cost = await m.costSnapshot();
        console.log(`Cost: $${cost.total().toFixed(8)}`);
    } finally {
        await m.cleanup();
    }
})();
