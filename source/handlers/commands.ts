import { forEachFile } from "../utils/files";
import { Message } from "discord.js";
import path from "path";

interface PrefixedCommand
{
    name: string,
    execute: (message: Message) => Promise<any>
}

export const commands: PrefixedCommand[] = [];

const initialFolder = path.join(__dirname, "..", "commands");

forEachFile<PrefixedCommand>(initialFolder, file => {
    if ("name" in file && "execute" in file) commands.push(file);
});