import { GuildMember, User } from "discord.js";
import { ModBot } from "../ModBot";
import { PermissionInfo } from "./PermissionInfo";

export class PermissionManager {
    #client: ModBot;

    constructor(client: ModBot) {
        this.#client = client;
    }

    calculatePermissionInfo(user: User, guildMember?: GuildMember): PermissionInfo {
        let permInfo = new PermissionInfo();

        if (this.#client.getBotAdmins().some((i) => i == user.id)) permInfo.permissionLevel += 100;

        if (guildMember) {
            permInfo.isAdmin = guildMember.permissions.has("ADMINISTRATOR");
            if (permInfo.isAdmin) permInfo.permissionLevel += 10;

            permInfo.canKickPeople = permInfo.isAdmin || guildMember.permissions.has("KICK_MEMBERS");
            if (permInfo.canKickPeople) permInfo.permissionLevel += 1;

            permInfo.canBanPeople = permInfo.isAdmin || guildMember.permissions.has("BAN_MEMBERS");
            if (permInfo.canBanPeople) permInfo.permissionLevel += 1;

            permInfo.canMutePeople = permInfo.isAdmin || guildMember.permissions.has("MUTE_MEMBERS");
            if (permInfo.canMutePeople) permInfo.permissionLevel += 1;

            permInfo.canDeafenPeople = permInfo.isAdmin || guildMember.permissions.has("DEAFEN_MEMBERS");
            if (permInfo.canDeafenPeople) permInfo.permissionLevel += 1;

            permInfo.canManageChannels = permInfo.isAdmin || guildMember.permissions.has("MANAGE_CHANNELS");
            if (permInfo.canManageChannels) permInfo.permissionLevel += 1;

            permInfo.canManageRoles = permInfo.isAdmin || guildMember.permissions.has("MANAGE_ROLES");
            if (permInfo.canManageRoles) permInfo.permissionLevel += 1;
        }

        return permInfo;
    }
}
