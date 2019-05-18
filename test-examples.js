"use strict";

const { readdirSync, statSync } = require("fs");
const { exec } = require("child_process");

async function execCmd(cmd, options) {
    await new Promise((resolve, reject) =>
        exec(cmd, options, (err, stdout, stderr) => {
            if (err) {
                reject(err);
            }
            console.log(stdout);
            if (stderr) {
                console.log(stderr);
            }
            resolve();
        })
    );
}

async function process(test) {
    let lang = "js";
    if (test.match(/-ts$/)) {
        lang = "ts";
    }
    const entries = readdirSync(test);
    if (entries.find(file => file === "tsconfig.json")) {
        lang = "ts";
    }
    await execCmd("npm install", { cwd: test });
    if (lang === "ts") {
        await execCmd("npm run build", { cwd: test });
    }
    await execCmd("npm run test", { cwd: test });
}

async function main() {
    const entries = readdirSync(".").filter(
        entry =>
            entry !== "aws-top-packages" &&
            entry[0] !== "." &&
            statSync(entry).isDirectory()
    );
    const promises = entries.map(dir => {
        console.log(`testing ${dir}`);
        return process(dir);
    });
    await Promise.all(promises);
}

main();
