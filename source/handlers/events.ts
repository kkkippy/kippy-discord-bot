import fs from "fs";
import path from "path";

interface Event
{
    eventName: string,
    once?: boolean,
    execute: (...args: any[]) => Promise<any>
}

export const events: Event[] = [];

const initialFolder = path.join(__dirname, "..", "events");

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
        const event = require(filePath);

        if (event.eventName && event.execute) events.push(event);
    }

    if (file.isDirectory())
    {
        readFolder(filePath);
    }
}