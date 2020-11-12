import { ModBot } from "../ModBot";

export class Event {
    name: string;
    eventName: string;

    public onLoad(client: ModBot) {}
    public onEvent(...args: any) {}
    public onUnload(client: ModBot): void | any {}
}
