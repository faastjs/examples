import * as process from "child_process";

export function exec(command: string) {
    return process.execSync(command).toString();
}
