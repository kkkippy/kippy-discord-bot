import { ButtonContext } from "../events/buttonInteraction";
import { ButtonInteraction } from "discord.js";
import { forEachFile } from "../utils/files";
import path from "path";

interface Button
{
    buttonContext: ButtonContext,
    execute: (interaction: ButtonInteraction, ...buttonProperties: any[]) => Promise<any>
}

export const buttons: Button[] = [];

const initialFolder = path.join(__dirname, "..", "buttons");

forEachFile<Button>(initialFolder, file => {
    if ("buttonContext" in file && "execute" in file) buttons.push(file);
});