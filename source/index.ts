import { deployCommands } from "./deploy-commands";
import { events } from "./handlers/events";
import { GetAllUsers, mongoConnect } from "./mongoose";
import { token } from "./config.json";
import { client } from "./client";

GetAllUsers().then(console.log);

mongoConnect();

events.forEach(event => client.on(event.eventName, event.execute));

deployCommands();

client.login(token);