import { isBlacklisted, moderateMessage } from "../utils/blacklist";
import { commands } from "../handlers/commands";
import { Events, Message } from "discord.js";
import { hasUrl } from "../utils/utils";

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

async function filterCreationsMessage (message: Message)
{
	if (message.attachments.size === 0 && !hasUrl(message.content))
	{
		await message.delete();
		await message.member?.send("Ei, você não pode enviar mensagens soltas nas criações! Adicione um link ou alguma mídia para conseguir enviar sem nenhum problema.").catch();
	} else
	{
		await message.react("<:verificado:1219652443105787924>").catch();
		await message.react("<:cancelar:1219659918592708649>").catch();
		await message.react("<:estrela:1219659104763641977>").catch();
		await message.startThread({
			name: `Criação de ${message.author.username}`
		}).catch();
	}
}

export const execute = async (message: Message) => {
	if (!message.member || message.author.bot) return;

	if (isBlacklisted(message)) return await moderateMessage(message, "Envio de mensagem blacklisted.");

	if (message.channelId === "1207419439914684446") filterCreationsMessage(message);

	
}
