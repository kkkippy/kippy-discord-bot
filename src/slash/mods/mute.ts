import {
    ChatInputCommandInteraction,
    Guild,
    SlashCommandBuilder,
    User
} from "discord.js";

import {
    moderatorRole,
    adminRole
} from "../../data/ids.json";

import { SendPunishmentLog } from "../../utils/logs";
import { Mute } from "../../utils/applyPunishment";

export const data = new SlashCommandBuilder()
.setName("mute")
.setDescription("Silencia um usuário.")

.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja silenciar.")
    .setRequired(true)
)

.addIntegerOption(option =>
    option
    .setName("duracao")
    .setDescription("Determine a duração do silenciamento em horas")
    .setRequired(true)
)

.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do silenciamento.")
)

export const requiredRoles = [
    moderatorRole,
    adminRole
];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const duration = interaction.options.getInteger("duracao") as number;
    const reason   = interaction.options.getString("motivo") || "Não especificado.";
    const user     = interaction.options.getUser("usuario") as User;

    const author = interaction.user;

    const guild = interaction.guild as Guild;

    try
    {
        const member = await guild.members.fetch(user.id);

        await Mute(member, duration, reason);

        await interaction.reply(`O usuário ${user} (${user.id}) foi silenciado em **${guild.name}** por ${duration} horas.`);

        await SendPunishmentLog(`O membro ${member} (${member.id}) foi **silenciado** por ${author} (${author.id}) de **${guild.name}** pelo motivo: **${reason}**`);
    } catch (e)
    {
        await interaction.reply(`Não foi possível silenciar o usuário ${user} (${user.id}).\n${e}.`).catch(console.error);
    }
}