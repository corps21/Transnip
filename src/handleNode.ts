import { createNode } from "./createNode.js";
import { OptionValues } from "commander";
import { readStream } from "../utils/stream.js";
import {
  startListeningAndGetClipboard,
  getWindowsClipboard,
  setWindowsClipboard
} from "../utils/clipboard.js";

function handleNode(options: OptionValues) {
  const node = createNode(options?.port, options?.listenAddress);

  if (options?.reciever) {
    node.then((reciever) => {
      reciever.addEventListener("peer:connect", (evt) => {
        const remotePeer = evt.detail;
        console.log("connected to: ", remotePeer.toString());
      });

      reciever.handle("/test/0.0.1", async (data) => {
        console.log("recieving");
        const recievedText = await readStream(data.stream)
        setWindowsClipboard(recievedText)
      });

      console.log("Listener ready, listening on:");
      reciever.getMultiaddrs().forEach((ma) => {
        console.log(ma.toString());
      });
    });
  } else {
    node.then((sender) => {
      console.log("Dialer ready, listening on:");
      sender.getMultiaddrs().forEach((ma) => {
        console.log(ma.toString());
      });
      sender.addEventListener("peer:discovery", (evt) => {
        console.log("Discovered some peers");
        startListeningAndGetClipboard(
          getWindowsClipboard,
          sender,
          evt.detail.multiaddrs,
          "/test/0.0.1"
        );
      });
    });
  }
}

export { handleNode };
