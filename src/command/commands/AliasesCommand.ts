import { Message } from "discord.js";
import { ModBot } from "../../ModBot";
import { Command } from "../Command";
import { IOtherInfo } from "../IOtherInfo";

export class AliasesCommand extends Command {
    constructor() {
        super({
            name: "aliases",
            description: "Get the aliases of the command!",
            aliases: ["alias"]
        });
    }

    async onMessage(msg: Message, client: ModBot, otherInfo: IOtherInfo) {
        if (otherInfo.args[1]) {
            let command = client.getCommandManager().getCommands().get(otherInfo.args[1]);
            if (command) {
                msg.reply(
                    "Command aliases:\n\n" +
                        [command.name, ...command.aliases].map((i) => `- ${client.getBotPrefix()}${i}`).join("\n"),
                    {
                        code: true,
                        split: { char: "\n" }
                    }
                );
            } else {
                msg.reply("Command is not found!");
            }
        } else {
            msg.reply("Please specify a command name.");
        }
    }
}
