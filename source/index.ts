import { deployCommands } from "./deploy-commands";
import { events } from "./handlers/events";
import { mongoConnect } from "./mongoose";
import { token } from "./config.json";
import { client } from "./client";

mongoConnect();

events.forEach(event => client.on(event.eventName, event.execute));

deployCommands();

client.login(token);