import { spawn } from "node:child_process"
import { readableToString } from "../utils/readableToString.js";

async function getWindowsClipboard() {
    const copy = spawn("powershell", ["get-clipboard"]);
    return (await readableToString(copy.stdout)).toString()
}

function setWindowsClipboard(value:string) {
    spawn("clip").stdin.end(value)
}

export { getWindowsClipboard,setWindowsClipboard}
