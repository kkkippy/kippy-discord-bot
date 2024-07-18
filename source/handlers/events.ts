import ForEachFile from "../utils/fileManager";
import path from "path";

interface Event
{
    eventName: string,
    once?: boolean,
    
    execute: (...args: any[]) => Promise<any>
}

const events: Event[] = [];

const initialFolder = path.join(__dirname, "..", "events");

ForEachFile<Event>(initialFolder, file => {
    if ("eventName" in file && "execute" in file) events.push(file);
});

export default events;