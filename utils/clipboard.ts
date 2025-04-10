import { spawn } from "node:child_process";
import { readableToString } from "./readableToString.js";
import clipboardListener from "clipboard-event";
import { Libp2p, ServiceMap, PeerId } from "@libp2p/interface";
import { Multiaddr } from "@multiformats/multiaddr";
import { writeStream } from "./stream.js";

function startListeningAndGetClipboard(
  getClipboard: () => Promise<string>,
  sender: Libp2p<ServiceMap>,
  peer: PeerId | Multiaddr | Multiaddr[],
  protocols: string | string[]
) {
  clipboardListener.startListening();
  clipboardListener.on("change", async () => {
    console.time("clip")
    const clipboardText = await getClipboard();
    console.log(clipboardText)
    const stream = await sender.dialProtocol(peer, protocols);
    writeStream(stream, clipboardText);
    console.timeEnd("clip")
  });
}

async function getWindowsClipboard() {
  const copy = spawn("powershell", ["get-clipboard"]);
  return await readableToString(copy.stdout);
}

function setWindowsClipboard(value: string) {
  spawn("clip").stdin.end(value);
}

export {
  getWindowsClipboard,
  setWindowsClipboard,
  startListeningAndGetClipboard,
};
