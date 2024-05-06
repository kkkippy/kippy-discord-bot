import { Events, Message } from "discord.js";
import { isBlacklisted, moderateMessage } from "../utils/blacklist";

export const eventName = Events.MessageCreate;

export const execute = async (message: Message) => {
	if (isBlacklisted(message)) return await moderateMessage(message, "Envio de mensagem blacklisted.");
}
