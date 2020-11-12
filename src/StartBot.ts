import * as dotenv from "dotenv";
import { ModBot } from "./ModBot";

dotenv.config();

process.env.BOT_TOKEN = "Nzc0NjU4MTg0ODQ0NjczMDM0.X6a-pw.9J-6ulOkwnRpd2Oh14YkKa-XJGA";

const modBot = new ModBot({
    clientToken: process.env.BOT_TOKEN as string,
    botAdmins: [
        "707309693449535599", // Armağan
        "558016135052787773" // Mert / Alosha
    ]
});

modBot.init().then(() => {
    console.log("Bot is ready!", modBot?.user?.tag);
    console.log(modBot.getCommandManager().getCommands().size, "command(s) are loaded!");
});
