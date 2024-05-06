import { isBlacklisted, moderateMessage } from "../utils/blacklist";
import { Events, Message } from "discord.js";

export const eventName = Events.MessageUpdate;

export const execute = async (message: Message) => {
	if (isBlacklisted(message)) return await moderateMessage(message, "Envio de mensagem blacklisted.");
}
