import { isBlacklisted, moderateMessage } from "../utils/blacklist";
import { commands } from "../handlers/commands";
import { Events, Message } from "discord.js";

export const eventName = Events.MessageCreate;

const prefix = "k.";

function isCommand (message: Message)
{
    if (!message.content.startsWith(prefix)) return;
    
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = commands.find(cmd => cmd.name === (args.shift() as string).toLowerCase());

	if (!command) return;

	command.execute(message);
}

export const execute = async (message: Message) => {
	if (!message.member || message.author.bot) return;

	if (isBlacklisted(message)) return await moderateMessage(message, "Envio de mensagem blacklisted.");
}
