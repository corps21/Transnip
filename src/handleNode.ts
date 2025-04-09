import { createNode } from "./createNode.js";
import { OptionValues } from "commander";

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
        sender.dialProtocol(evt.detail.multiaddrs, '/test/0.0.1').then(() => {
          console.log("sending something")
        })
      })
    });
  }
}

export { handleNode };
