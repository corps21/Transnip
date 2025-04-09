import { program } from "commander";
import figlet from "figlet";
import { handleNode } from "./handleNode.js";
console.log(figlet.textSync("Transnip"));

program
  .option("-p, --port <number>", "port number to listen (default: 10333)")
  .option(
    "-l, --listen-address [address...]",
    "list of listen addresses (default: 0.0.0.0)"
  )
  .option("-s, --sender", "sender (default: true)")
  .option("-r, --reciever", "reciever")
  .option("-t, --transport <type>", "transport type (default: tcp)")
  .description(
    "Transnip utility manages and synchronizes clipboard text across multiple devices in the local network."
  )
  .version("v0.0.1")
  .parse();

const options = program.opts();

if(options?.sender && options?.reciever) {
    program.error("Node can't be sender and receiver at the same time")
}

handleNode(options)
