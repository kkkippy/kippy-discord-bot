import { Events } from "discord.js";
import { client } from "../client";

export const eventName = Events.ClientReady;

export const execute = async () => {
	console.log(client.user?.username + " está ligado!");
}