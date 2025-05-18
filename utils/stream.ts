import {Stream} from "@libp2p/interface"

function writeStream(stream:Stream,text:string) {
    const uint8str = new TextEncoder().encode(text)
    stream.sink([uint8str])
}

async function readStream(stream:Stream) {
    return (await stream.source.next()).value?.bufs.toString()
}

export {writeStream, readStream}