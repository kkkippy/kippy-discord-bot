import { isBlacklisted } from "../utils/blacklist";
import { Events, Message } from "discord.js";

export const eventName = Events.MessageCreate;

export const execute = async (message: Message) => {
	if (!isBlacklisted(message)) return;
}

