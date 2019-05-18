"use strict";

const { readdirSync, statSync, readFileSync } = require("fs");
const { resolve, join } = require("path");
const { exec } = require("child_process");

let faastjsPackage;

async function execCmd(cmd, options) {
    await new Promise((resolve, reject) =>
        exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                console.log(stdout);
                if (stderr) {
                    console.log(stderr);
                }
                reject(err);
            }
            resolve();
        })
    );
}

async function runTest(test) {
    try {
        await execCmd("npm install", { cwd: test });
        if (faastjsPackage) {
            await execCmd(`npm install ${faastjsPackage}`, { cwd: test });
        }
        const pjs = JSON.parse(readFileSync(join(test, "package.json")));
        if (pjs.scripts && pjs.scripts.build) {
            await execCmd("npm run build", { cwd: test });
        }
        await execCmd("npm run test", { cwd: test });
        console.log(`[pass] ${test}`);
    } catch (err) {
        console.log(`[fail] ${test}: ${err}`);
        process.exit(1);
    }
}

let queue = [];

async function work() {
    const dir = queue.pop();
    if (dir === undefined) {
        return;
    }
    console.log(`testing ${dir}`);
    await runTest(dir);
    await work();
}

async function main() {
    queue = readdirSync(".").filter(
        entry =>
            entry !== "aws-top-packages" &&
            entry[0] !== "." &&
            statSync(entry).isDirectory()
    );

    work();
    work();
    work();
    work();
}

if (process.argv[2]) {
    faastjsPackage = resolve(process.argv[2]);
    console.log(`resolved ${faastjsPackage}`);
}
main();
