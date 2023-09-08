"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
class EventBus {
    constructor() {
        this.idEventMap = {};
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
        this.idEventMap[id] = event;
        return {
            id: id,
            event: event,
            unregister: () => this.unregister(id)
        };
    }
    unregister(id) {
        const event = this.idEventMap[id];
        if (this.subscribers[event]) {
            delete this.subscribers[event][id];
            if (Object.keys(this.subscribers[event]).length === 0) {
                delete this.subscribers[event];
            }
        }
        delete this.idEventMap[id];
    }
    getNextId() {
        return EventBus.nextId++;
    }
}
EventBus.nextId = 0;
EventBus.instance = undefined;
exports.EventBus = EventBus;
