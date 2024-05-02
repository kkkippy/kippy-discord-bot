import { Client, Events } from "discord.js";

export const eventName = Events.ClientReady;

export const execute = async (client: Client) => {
	console.log(client.user?.username + " está ligado!");
}