import {
	clientId,
	token
} from "./config.json";

import {
	Routes,
	REST
} from "discord.js";

import slashCommands from "./handlers/slash";

export const deployCommands = async () => {
	const rest = new REST().setToken(token);
	
	const body = {
		body: slashCommands.map(slashCommand => slashCommand.data.toJSON())
	}

	await rest.put(Routes.applicationCommands(clientId), body)
	.then(() => console.log(`${body.body.length} comando(s) recarregado(s).`));
}