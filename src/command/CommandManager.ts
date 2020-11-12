import { ModBot } from "../ModBot";
import { Command } from "./Command";
import { TestCommand } from "./commands/TestCommand";
import { HelpCommand } from "./commands/HelpCommand";
import { Message } from "discord.js";
import { GetPermLevelCommand } from "./commands/GetPermLevelCommand";
import { AliasesCommand } from "./commands/AliasesCommand";
import { ICommandArg } from "./Argument/ICommandArgument";
import { Utils } from "../utils/Utils";

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
            throw `This command already loaded! (${command.name})`;
        }
    }

    private registerCommandListeners() {
        this.#client.on("message", (msg: Message) => {
            let botPrefix = this.#client.getBotPrefix();
            let permissionInfo = this.#client
                .getPermissionManager()
                .calculatePermissionInfo(msg.author, msg?.member || undefined);

            let args = msg.content.split(" ");
            let prefixArg: string = args.shift() ? (args.shift() as string) : "";

            this.#commands.forEach((cmd: Command) => {
                if (
                    [cmd.name, ...cmd.aliases].some((cmdAlias) => {
                        return (
                            msg.content.startsWith(botPrefix) &&
                            cmdAlias.toLowerCase() == prefixArg.slice(botPrefix.length).toLowerCase()
                        );
                    })
                ) {
                    if (permissionInfo.permissionLevel >= cmd.permissionLevel || permissionInfo.permissionLevel == -1) {
                        if (cmd.args.length != 0) {
                            let errorMsgs: string[] = [];
                            cmd.args.forEach((cmdArg: ICommandArg, index: number) => {
                                if (cmdArg.required && typeof args[index] == "undefined") {
                                    return errorMsgs.push(
                                        `Argument \`${index}\` with type \`${cmdArg.type}\` is **required**.`
                                    );
                                }

                                try {
                                    let parsedArg = Utils.tryToParseTypeStrict(args[index], [cmdArg.type]);
                                    cmd.args[index] = parsedArg;
                                }
                            });
                        } else {
                            cmd.onMessage(msg, this.#client, { permissionInfo, args });
                        }
                    } else {
                        msg.reply("Your permission level doesn't allows you to use that command!");
                    }
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
