import { Message } from "discord.js";
import { Command } from "../Command";

export class TestCommand extends Command {
    constructor() {
        super({
            name: "test-command",
            aliases: ["test-alias-1", "test-alias-2"],
            description: "Test command yeah!"
        });
    }

    async onMessage(msg: Message) {
        msg.reply("Test command!");
    }
}
