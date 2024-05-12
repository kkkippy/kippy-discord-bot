import { forEachFile } from "../utils/files";
import path from "path";

interface Event
{
    eventName: string,
    once?: boolean,
    execute: (...args: any[]) => Promise<any>
}

export const events: Event[] = [];

const initialFolder = path.join(__dirname, "..", "events");

forEachFile<Event>(initialFolder, file => {
    if ("eventName" in file && "execute" in file) events.push(file);
});