import { Client, ClientOptions } from "discord.js";
import { CommandManager } from "./command/CommandManager";
import { PermissionManager } from "./permission/PermissionManager";

interface ModBotProps {
    clientOptions?: ClientOptions;
    clientToken: string;
    botPrefix?: string;
    botAdmins?: string[];
}

export class ModBot extends Client {
    #commandManager: CommandManager;
    #permissionManager: PermissionManager;

    #clientToken: string;
    #botPrefix: string;
    #botAdmins: string[];

    constructor({ clientOptions, clientToken, botPrefix, botAdmins }: ModBotProps) {
        super(clientOptions);
        this.#clientToken = clientToken;
        this.#botPrefix = botPrefix ? botPrefix : "!";
        this.#botAdmins = botAdmins ? botAdmins : [];
    }

    async init(): Promise<ModBot> {
        await this.login(this.#clientToken);

        this.#commandManager = new CommandManager(this);
        await this.#commandManager.init();

        this.#permissionManager = new PermissionManager(this);

        return this;
    }

    getBotPrefix(): string {
        return this.#botPrefix;
    }

    getBotAdmins(): string[] {
        return this.#botAdmins;
    }

    getCommandManager(): CommandManager {
        return this.#commandManager;
    }

    getPermissionManager(): PermissionManager {
        return this.#permissionManager;
    }
}
