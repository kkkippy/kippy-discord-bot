import { ChatInputCommandInteraction, Events } from "discord.js";
import { slashCommands } from "../handlers/slash";
import { RegisterUser } from "../mongoose";
import { mods } from "../utils/mods";
import { client } from "../client";

export const eventName = Events.InteractionCreate;

export const execute = async (interaction: ChatInputCommandInteraction) => {
	if (!interaction.isChatInputCommand()) return;

	const slashCommand = slashCommands.find(cmd => cmd.data.name === interaction.commandName);

	if (!slashCommand) return interaction.reply(`Nenhuma correspondência foi encontrada para o comando ${interaction.commandName}.`);
	
	let guild = client.guilds.cache.first();
	let member = guild?.members.cache.get(interaction.user.id);

	if (
		(
			!member                                                       // Se não possuir o objeto membro,
			|| !mods[member.id]                                           // ou não estiver na lista de moderadores/administradores,
			|| !mods[member.id].includes(slashCommand.requiredPermission) // ou não possuir a permissão necessária para executar o comando,
		) 
		&& slashCommand.requiredPermission                          	  // e o comando exigir permissão para ser executado
	) return interaction.reply("Você não tem permissão para usar este comando.");

	if (interaction.member)	await RegisterUser(interaction.user);

	return slashCommand.execute(interaction);
}