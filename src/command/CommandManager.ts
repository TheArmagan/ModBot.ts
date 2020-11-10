import { ModBot } from "../ModBot";
import { Command } from "./Command";
import { TestCommand } from "./commands/TestCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { Message } from "discord.js";
import { GetPermLevelCommand } from "./commands/GetPermLevelCommand";
import { AliasesCommand } from "./commands/AliasesCommand";

export class CommandManager {
    #commands: Map<string, Command> = new Map<string, Command>();
    #client: ModBot;

    constructor(client: ModBot) {
        this.#client = client;
    }

    async init() {
        this.addCommandClass(new TestCommand());
        this.addCommandClass(new HelpCommand());
        this.addCommandClass(new GetPermLevelCommand());
        this.addCommandClass(new AliasesCommand());

        this.registerCommandListeners();
        return;
    }

    addCommandClass(command: Command): void {
        if (!this.#commands.has(command.name)) {
            this.#commands.set(command.name, command);
            command.onLoad(this.#client);
        } else {
            throw "This command already loaded!";
        }
    }

    private registerCommandListeners() {
        this.#client.on("message", (msg: Message) => {
            let botPrefix = this.#client.getBotPrefix();
            let permissionInfo = this.#client
                .getPermissionManager()
                .calculatePermissionInfo(msg.author, msg?.member || undefined);

            let args = msg.content.split(" ");

            this.#commands.forEach((cmd: Command) => {
                if (
                    [cmd.name, ...cmd.aliases].some((cmdAlias) => {
                        return (
                            msg.content.startsWith(botPrefix) &&
                            cmdAlias.toLowerCase() == args[0].slice(botPrefix.length).toLowerCase()
                        );
                    })
                ) {
                    cmd.onMessage(msg, this.#client, { permissionInfo, args });
                }
            });
        });
    }

    getCommands(): Map<string, Command> {
        return this.#commands;
    }

    getClient(): ModBot {
        return this.#client;
    }
}
