import { Readable } from "node:stream";

export async function readableToString(readable:Readable) {
    const chunks = [];
    for await (const chunk of readable) {
      chunks.push(chunk);
    }
    return chunks;
}