import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionResolvable } from "discord.js";
import { forEachFile } from "../utils/files";
import path from "path";

interface SlashCommand
{
    data: SlashCommandBuilder,
    requiredPermission: PermissionResolvable,
    execute: (interaction: ChatInputCommandInteraction) => Promise<any>
}

export const slashCommands: SlashCommand[] = [];

const initialFolder = path.join(__dirname, "..", "slash");

forEachFile<SlashCommand>(initialFolder, file => {
    if ("data" in file && "execute" in file) slashCommands.push(file);
});