/*
Caso queira remover este comando, lembre-se de remover seu respectivo embed em punch.ts, localizado em /source/utils/punishmentEmbeds
e também de remover a propriedade 'saitamaRole' de generalConfig.json localizado em /source/data

Fiz este comando para memorar o meu amigo Ianwu8, que é o único administrador com permissão de administrador de fato do meu servidor
*/

import {
    ChatInputCommandInteraction,
    SlashCommandBuilder
} from "discord.js";

import { saitamaRole } from "../../data/ids.json";

export const data = new SlashCommandBuilder()
.setName("punch")
.setDescription("...")
.setDMPermission(false);

export const requiredRoles = [ saitamaRole ];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    // Comando de ban super fodástico (ainda preciso fazer)
    return await interaction.reply("Olá mestre.");
}