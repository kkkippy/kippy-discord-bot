import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

import ForEachFile from "../utils/fileManager";
import path from "path";

interface SlashCommand
{
    data: SlashCommandBuilder,
    requiredRoles: Array<string>,

    execute: (interaction: ChatInputCommandInteraction) => Promise<any>
}

const slashCommands: SlashCommand[] = [];

const initialFolder = path.join(__dirname, "..", "slash");

ForEachFile<SlashCommand>(initialFolder, file => {
    if ("data" in file && "execute" in file) slashCommands.push(file);
});

export default slashCommands;