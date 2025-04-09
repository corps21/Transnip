import { createLibp2p } from 'libp2p'
import { tcp } from '@libp2p/tcp'
import { noise } from '@chainsafe/libp2p-noise'
import { yamux } from '@chainsafe/libp2p-yamux'
import { mdns } from '@libp2p/mdns'
import { Libp2pOptions } from 'libp2p'


async function createNode(portNumber:number=0,ipv4Address:string="0.0.0.0",config?:Libp2pOptions) {
    const defaults: Libp2pOptions = {
        addresses: {
            listen: [`/ip4/${ipv4Address}/tcp/${portNumber}`]
        },
        transports: [tcp()],
        streamMuxers:[yamux()],
        connectionEncrypters:[noise()],
        peerDiscovery: [mdns()]
    }
    
    if(config && Object.keys(config).length > 0) {
        return await createLibp2p(config)
    }

    return await createLibp2p(defaults)
}

export {createNode}