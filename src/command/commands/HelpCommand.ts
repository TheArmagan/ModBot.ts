import { Message } from "discord.js";
import { ModBot } from "../../ModBot";
import { Command } from "../Command";
import { IOtherInfo } from "../IOtherInfo";

export class HelpCommand extends Command {
    constructor() {
        super({
            name: "help",
            description: "Command list.",
            args: []
        });
    }

    async onMessage(msg: Message, client: ModBot, otherInfo: IOtherInfo) {
        let commands = Array.from(client.getCommandManager().getCommands());

        if (otherInfo.args[1]) {
            let command = client.getCommandManager().getCommands().get(otherInfo.args[1]);
            if (command) {
                msg.reply(
                    `Command Name:
                    ${command.name}

                    Usage:
                    ${client.getBotPrefix()}${command.name} ${command.args.join(" ")}

                    Command Description:
                    ${command.description}
                    
                    Command Aliases:
                    ${[command.name, ...command.aliases].map((i) => `${client.getBotPrefix()}${i}`).join(", ")}
                    
                    Command Minimum Permission Level:
                    ${command.permissionLevel}
                    `.replace(/                    /gm, ""),
                    {
                        code: true,
                        split: {
                            char: "\n"
                        }
                    }
                );
            } else {
                msg.reply("Command is not found!");
            }
        } else {
            msg.channel.send(
                `Total ${commands.length} command(s)!

                ${commands
                    .map(([, cmd]) => {
                        return `${client.getBotPrefix()}${cmd.name}${cmd?.args ? " " + cmd.args.join(" ") : ""} ${
                            cmd.description ? " - " + cmd.description : ""
                        }`;
                    })
                    .join("\n")}
                `.replace("                ", ""),
                { code: true, split: { char: "\n" } }
            );
        }
    }
}
