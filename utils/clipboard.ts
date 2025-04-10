import { spawn } from "node:child_process";
import { readableToString } from "./readableToString.js";
import clipboardListener, { ClipboardEventListener } from "clipboard-event";
import {Stream} from "@libp2p/interface"

function startListeningAndGetClipboard(
  getClipboard: () => Promise<string>,
  dialProtocol: Promise<Stream>,
  dialProtocolCallback: (...args:unknown[]) => void
) {
  return function () {
    clipboardListener.startListening();
    clipboardListener.on("change", async () => {
      // const result = await getClipboard();
      // console.log("this is result ", result)
      // dialProtocol.then((...args) => {
      //   dialProtocolCallback(result,...args);
      // });
      console.log("Got called")
    });
    clipboardListener.stopListening();
  };
}

async function getWindowsClipboard() {
  const copy = spawn("powershell", ["get-clipboard"]);
  return await readableToString(copy.stdout);
}

function setWindowsClipboard(value: string) {
  spawn("clip").stdin.end(value);
}

export { getWindowsClipboard, setWindowsClipboard,startListeningAndGetClipboard };
