import { ModBot } from "../ModBot";
import { Event } from "./Event";

export class EventManager {
    #client: ModBot;
    #events: Map<string, Event> = new Map<string, Event>();

    constructor(client: ModBot) {
        this.#client = client;
    }

    async init() {}

    addEventClass(cls: Event): void {
        if (!this.#events.has(cls.name)) {
            this.#events.set(cls.name, cls);
            cls.onLoad(this.#client);
        } else {
            throw `This event already loaded! (${cls.name}:${cls.eventName})`;
        }
    }
}
