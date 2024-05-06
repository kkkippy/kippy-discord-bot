import { isBlacklisted, moderateMessage } from "../utils/blacklist";
import { Events, Message } from "discord.js";

export const eventName = Events.MessageCreate;

export const execute = async (message: Message) => {
	if (message.author.bot) return;

	if (isBlacklisted(message)) return await moderateMessage(message, "Envio de mensagem blacklisted.");
}
