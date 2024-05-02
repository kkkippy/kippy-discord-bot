import { slashCommands } from "./handlers/slash";
import { clientId, token } from "./config.json";
import { REST, Routes } from "discord.js";

export const deployCommands = async () => {
	const rest = new REST().setToken(token);
	
	const body = {
		body: slashCommands.map(slashCommand => slashCommand.data.toJSON())
	}

	await rest.put(Routes.applicationCommands(clientId), body)
	.then(() => console.log(`${body.body.length} comando(s) recarregado(s).`));
}