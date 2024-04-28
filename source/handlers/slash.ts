import { SlashCommandBuilder, ChatInputCommandInteraction, PermissionResolvable } from "discord.js";
import fs from "fs";
import path from "path";

interface SlashCommand
{
    data: SlashCommandBuilder,
    requiredPermission: PermissionResolvable,
    execute: (interaction: ChatInputCommandInteraction) => Promise<any>
}

export const slashCommands: SlashCommand[] = [];

const initialFolder = path.join(__dirname, "..", "slash");

readFolder(initialFolder);

function readFolder (dirPath: string) {
    let folder = fs.readdirSync(dirPath);

    for (const file of folder)
    {
        readFile(path.join(dirPath, file));
    }
}

function readFile (filePath: string) {
    const file = fs.lstatSync(filePath);

    if (file.isFile())
    {
        const slash = require(filePath);

        if (slash.data && slash.execute) slashCommands.push(slash);
    }

    if (file.isDirectory())
    {
        readFolder(filePath);
    }
}