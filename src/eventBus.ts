//From https://github.com/luixaviles/event-bus-typescript
export interface IEventBusRegistry {
    unregister: () => void;
}

export interface ICallable {
    [key: string]: Function;
}

export interface ISubscriber {
    [key: string]: ICallable;
}

export interface IEventBus {
    dispatch<T>(event: string, arg?: T): void;
    register(sender: any, event: string, callback: Function): IEventBusRegistry;
}

export class EventBus implements IEventBus {
    private subscribers: ISubscriber;
    private static nextId = 0;
    private static instance?: EventBus = undefined;

    private constructor() {
        this.subscribers = {};
    }

    public static getInstance(): EventBus {
        if (this.instance === undefined) {
            this.instance = new EventBus();
        }

        return this.instance;
    }

    public dispatch<T>(event: string, arg?: T): void {
        const subscriber = this.subscribers[event];

        if (subscriber === undefined) {
            return;
        }

        Object.keys(subscriber).forEach((key) => subscriber[key](arg));
    }

    public register(sender: any, event: string, callback: Function): IEventBusRegistry {
        const id = this.getNextId();
        if (!this.subscribers[event]) this.subscribers[event] = {};

        this.subscribers[event][id] = callback.bind(sender);

        return {
            unregister: () => {
                delete this.subscribers[event][id];
                if (Object.keys(this.subscribers[event]).length === 0)
                    delete this.subscribers[event];
            },
        };
    }

    private getNextId(): number {
        return EventBus.nextId++;
    }
}