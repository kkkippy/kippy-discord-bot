import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    Guild,
    User
} from "discord.js";

import { adminRole } from "../../data/ids.json";
import { SendPunishmentLog } from "../../utils/logs";
import { Ban } from "../../utils/applyPunishment";

export const data = new SlashCommandBuilder()
.setName("ban")
.setDescription("Bane um usuário.")

.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja banir.")
    .setRequired(true)
)

.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do banimento.")
)

export const requiredRoles = [ adminRole ];

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    const author = interaction.user;
    
    const guild = interaction.guild as Guild;
    
    try
    {
        const member = await guild.members.fetch(user.id);

        if (member) await member.send({ embeds: [ /* Colocar o embed aqui */ ] });
        
        await Ban(user, interaction.user, reason);

        await interaction.reply(`O usuário ${user} (${user.id}) foi banido de **${guild.name}**.`);

        await SendPunishmentLog(`O ${member ? "membro" : "usuário"} ${user} (${user.id}) foi **banido** por ${author} (${author.id}) de **${guild.name}** pelo motivo: **${reason}**`);
    } catch (e)
    {
        await interaction.reply(`Não foi possível banir o usuário ${user} (${user.id}).\n${e}.`).catch(console.error);
    }
}