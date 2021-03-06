import { Message } from "discord.js";
import { ModBot } from "../ModBot";
import { ICommandArgument } from "./Argument/ICommandArgument";
import { IOtherInfo } from "./IOtherInfo";

interface CommandProps {
    name: string;
    description?: string;
    aliases?: string[];
    permissionLevel?: number;
    args?: Array<ICommandArgument>;
}

export class Command {
    name: string;
    description: string;
    permissionLevel: number;
    aliases: string[];
    args: Array<ICommandArgument>;
    fileLocation: string;

    constructor({ name, description = "", aliases = [], permissionLevel = 0, args = [] }: CommandProps) {
        this.name = name;
        this.description = description;
        this.aliases = aliases;
        this.permissionLevel = permissionLevel;
        this.args = args;
    }

    public onLoad(client: ModBot): void | any {}
    public onMessage(msg: Message, client: ModBot, otherInfo: IOtherInfo): void | any {}
    public onUnload(client: ModBot): void | any {}
}
