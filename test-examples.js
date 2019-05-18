"use strict";

const { readdirSync, statSync, readFileSync } = require("fs");
const { resolve, join } = require("path");
const { exec } = require("child_process");

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

async function runTest(test, pkg) {
    try {
        await execCmd("npm install", { cwd: test });
        if (pkg) {
            await execCmd(`npm install ${pkg}`, { cwd: test });
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

async function main(pkg) {
    const entries = readdirSync(".").filter(
        entry =>
            entry !== "aws-top-packages" &&
            entry[0] !== "." &&
            statSync(entry).isDirectory()
    );
    for (const dir of entries) {
        console.log(`testing ${dir}`);
        await runTest(dir, pkg);
    }
}

let pkg;
if (process.argv[2]) {
    pkg = resolve(process.argv[2]);
    console.log(`resolved ${pkg}`);
}
main(pkg);
