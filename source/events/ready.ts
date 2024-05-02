import { Client, Events, Guild } from "discord.js";
import { MUser, UserModel } from "../models/user";
import { GetAllUsers, RemoveUser } from "../mongoose";

export const eventName = Events.ClientReady;

async function Purge (guild: Guild) {
	(await GetAllUsers()).forEach(async (user: MUser) => {
		const member = await guild.members.fetch({
			user: user.id.toString()
		})

		if (!member) return;

		if (!guild?.members.cache.get(member.id)) await RemoveUser(member.user);
	})
}

export const execute = async (client: Client) => {
	console.log(client.user?.username + " está ligado!");
	
	// O usuário que não estiver no servidor será removido do banco de dados
	const guild = client.guilds.cache.first() as Guild;

	Purge(guild);
}
