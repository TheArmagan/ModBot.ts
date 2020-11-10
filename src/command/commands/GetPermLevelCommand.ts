import { Message } from "discord.js";
import { ModBot } from "../../ModBot";
import { Command } from "../Command";
import { IOtherInfo } from "../IOtherInfo";

export class GetPermLevelCommand extends Command {
    constructor() {
        super({
            name: "get-perm-info",
            description: "You permissionManager info!"
        });
    }

    async onMessage(msg: Message, client: ModBot, otherInfo: IOtherInfo) {
        msg.reply(
            `\`\`\`${Object.entries(otherInfo.permissionInfo)
                .map((i) => `- ${i[0]}: ${i[1]}`)
                .join("\n")}\`\`\``
        );
    }
}
