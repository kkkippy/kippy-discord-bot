import { deployCommands } from "./deploy-commands";
import events from "./handlers/events";
import { token } from "./config.json";
import client from "./client";

events.forEach(event => client.on(event.eventName, event.execute));

deployCommands();

client.login(token);