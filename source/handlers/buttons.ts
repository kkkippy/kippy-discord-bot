import { ButtonContext } from "../events/buttonInteraction";
import { ButtonInteraction } from "discord.js";
import path from "path";
import fs from "fs";

interface Button
{
    buttonContext: ButtonContext,
    execute: (interaction: ButtonInteraction, ...buttonProperties: any[]) => Promise<any>
}

export const buttons: Button[] = [];

const initialFolder = path.join(__dirname, "..", "buttons");

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
        const button = require(filePath);

        if (button.buttonContext && button.execute) buttons.push(button);
    }

    if (file.isDirectory())
    {
        readFolder(filePath);
    }
}