import { EventEmitter } from 'events'
declare module "clipboard-event" {
    export class ClipboardEventListener extends EventEmitter {
        startListening: () => void
        stopListening: () => boolean
    }
    const clipboardListener: ClipboardEventListener
    export default clipboardListener;
}