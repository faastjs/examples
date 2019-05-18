"use strict";

const { readdirSync, statSync } = require("fs");
const { resolve } = require("path");
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
        let lang = "js";
        if (test.match(/-ts$/)) {
            lang = "ts";
        }
        const entries = readdirSync(test);
        if (entries.find(file => file === "tsconfig.json")) {
            lang = "ts";
        }
        await execCmd("npm install", { cwd: test });
        if (pkg) {
            await execCmd(`npm install ${pkg}`, { cwd: test });
        }
        if (lang === "ts") {
            await execCmd("npm run build", { cwd: test });
        }
        await execCmd("npm run test", { cwd: test });
        console.log(`[pass] ${test}`);
    } catch (err) {
        console.log(`[fail] ${test}: ${err}`);
        throw err;
    }
}

async function main(pkg) {
    const entries = readdirSync(".").filter(
        entry =>
            entry !== "aws-top-packages" &&
            entry[0] !== "." &&
            statSync(entry).isDirectory() &&
            entry === "aws-ts"
    );
    const promises = entries.map(dir => {
        console.log(`testing ${dir}`);
        return runTest(dir, pkg);
    });
    await Promise.all(promises);
}

let pkg;
if (process.argv[2]) {
    pkg = resolve(process.argv[2]);
    console.log(`resolved ${pkg}`);
}
main(pkg);
