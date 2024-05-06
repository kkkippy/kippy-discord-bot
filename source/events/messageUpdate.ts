import { isBlacklisted, moderateMessage } from "../utils/blacklist";
import { Events, Message } from "discord.js";

export const eventName = Events.MessageUpdate;

export const execute = async (oldMessage: Message, newMessage: Message) => {
	if (oldMessage.author.bot) return;
	
	if (isBlacklisted(newMessage)) return await moderateMessage(newMessage, "Envio de mensagem blacklisted.");
}
