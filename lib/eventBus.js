"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.subscribers = {};
    }
    static getInstance() {
        if (this.instance === undefined) {
            this.instance = new EventBus();
        }
        return this.instance;
    }
    dispatch(event, arg) {
        const subscriber = this.subscribers[event];
        if (subscriber === undefined) {
            return;
        }
        Object.keys(subscriber).forEach((key) => subscriber[key](arg));
    }
    register(sender, event, callback) {
        const id = this.getNextId();
        if (!this.subscribers[event])
            this.subscribers[event] = {};
        this.subscribers[event][id] = callback.bind(sender);
        return {
            unregister: () => {
                delete this.subscribers[event][id];
                if (Object.keys(this.subscribers[event]).length === 0)
                    delete this.subscribers[event];
            },
        };
    }
    getNextId() {
        return EventBus.nextId++;
    }
}
exports.EventBus = EventBus;
EventBus.nextId = 0;
EventBus.instance = undefined;
