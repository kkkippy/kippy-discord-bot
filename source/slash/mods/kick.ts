import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { BuildPunishmentEmbed } from "../../utils/buildEmbed";
import { RandomPhrase } from "../../utils/randomPhrase";
import Basil from "../../utils/basilEmotions.json";
import { mods } from "../../utils/mods";
import { client } from "../../client";

export const data = new SlashCommandBuilder()
.setName("kick")
.setDescription("Expulsa um usuário.")
.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja expulsar.")
    .setRequired(true)
)
.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do expulsamento.")
)

export const requiredPermission = PermissionFlagsBits.KickMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    let reason = interaction.options.getString("motivo") || "Não especificado.";
    let user   = interaction.options.getUser("usuario") as User;

    if (user === interaction.user) return interaction.reply(`${RandomPhrase()} o cabo de ${interaction.client.user} antes que você pudesse expulsar a si mesmo!`);
    if (mods[user.id]) return interaction.reply(`Ei, o que você pensa que tá fazendo?`);

    let guild  = client.guilds.cache.first();
    let member = guild?.members.cache.get(user?.id as string);

    let kickEmbed = await BuildPunishmentEmbed({
        title: `Você foi expulso de ${guild?.name}.`,
        punishedBy: interaction.user,
        thumbnail: Basil.mais_nervoso,
        color: 0xcc8658,
        reason,
    });

    if (member) await member?.send({ embeds: [ kickEmbed ] }).catch(console.log);

    await guild?.members?.kick(user, reason)
    .then(() => {
        interaction.reply(`O usuário ${user} (${user?.id}) foi expulso de ${guild?.name}.`);
    })
    .catch(e => {
        interaction.reply(`Não foi possível expulsar o usuário ${user} (${user?.id}).\n${e}.`);
    });
}