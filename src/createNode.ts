import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mdns } from '@libp2p/mdns'
import { Libp2pOptions } from 'libp2p'


async function createNode() {
    const defaults: Libp2pOptions = {
        addresses: {
            listen: ["/ip4/0.0.0.0/tcp/0"]
        },
        transports: [tcp()],
        streamMuxers:[yamux()],
        connectionEncrypters:[noise()],
        peerDiscovery: [mdns()]
    }
    const node = await createLibp2p(defaults)
    return node
}

export {createNode}