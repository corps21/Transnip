import { createNode } from "./createNode.js";
import { OptionValues } from "commander";
import { startListeningAndGetClipboard,getWindowsClipboard} from "../utils/clipboard.js";
function handleNode(options: OptionValues) {
  
  const node = createNode(options?.port, options?.listenAddress)

  if (options?.reciever) {
    node.then((reciever) => {
      reciever.addEventListener("peer:connect", (evt) => {
        const remotePeer = evt.detail;
        console.log("connected to: ", remotePeer.toString());
      });
      reciever
        .handle("/test/0.0.1", () => {
          console.log("recieving");
        })
        .then(() => {
          console.log("done with receiving");
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
      sender.addEventListener('peer:discovery', (evt) => {
        
        console.log("Discovered some peers")

        const dialProtocol = sender.dialProtocol(evt.detail.multiaddrs, '/test/0.0.1')
        const dialProtocolCallback = (...args:unknown[]) => {
          console.log("Got something")
          console.log(args)
        }
        console.time("Start")
        const callback = startListeningAndGetClipboard(getWindowsClipboard,dialProtocol,dialProtocolCallback)
        callback()
        console.timeEnd("Start")
      })
    });
  }
}

export { handleNode };
