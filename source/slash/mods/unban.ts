import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { mods } from "../../utils/mods";
import { client } from "../../client";

export const data = new SlashCommandBuilder()
.setName("unban")
.setDescription("Desbane um usuário.")
.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja desbanir.")
    .setRequired(true)
)
.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do desbanimento.")
)

export const requiredPermission = PermissionFlagsBits.BanMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const reason = interaction.options.getString("motivo") || "Não especificado.";
    const user   = interaction.options.getUser("usuario") as User;

    if (user === interaction.user) return await interaction.reply(`Não faz sentido desbanir a si mesmo, você já está no servidor!!`).catch();
    if (mods[user.id]) return await interaction.reply(`Por que desbanir o coleguinha de trabalho? <:thonk:1216077822242852996>`).catch();

    const guild  = client.guilds.cache.first();

    await guild?.members?.unban(user, reason)
    .then(async () => {
        await interaction.reply(`O usuário ${user} (${user?.id}) foi desbanido de ${guild?.name}.`).catch();
    })
    .catch(async e => {
        await interaction.reply(`Não foi possível desbanir o usuário ${user} (${user?.id}).\n${e}.`).catch();
    });
}