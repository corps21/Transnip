var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createLibp2p } from 'libp2p';
import { tcp } from '@libp2p/tcp';
import { noise } from '@chainsafe/libp2p-noise';
import { yamux } from '@chainsafe/libp2p-yamux';
import { mdns } from '@libp2p/mdns';
function createNode() {
    return __awaiter(this, void 0, void 0, function* () {
        const defaults = {
            addresses: {
                listen: ["/ip4/0.0.0.0/tcp/0"]
            },
            transports: [tcp()],
            streamMuxers: [yamux()],
            connectionEncrypters: [noise()],
            peerDiscovery: [mdns()]
        };
        const node = yield createLibp2p(defaults);
        return node;
    });
}
export { createNode };
