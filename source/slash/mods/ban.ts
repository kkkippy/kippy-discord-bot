import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { BuildPunishmentEmbed } from "../../utils/buildEmbed";
import { RandomPhrase } from "../../utils/randomPhrase";
import Basil from "../../utils/basilEmotions.json";
import { weekInSeconds } from "../../utils/utils";
import { RandomGIF } from "../../utils/banGifs";
import { mods } from "../../utils/mods";
import { client } from "../../client";

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

export const requiredPermission = PermissionFlagsBits.BanMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    let reason = interaction.options.getString("motivo") || "Não especificado.";
    let user   = interaction.options.getUser("usuario") as User;

    if (user === interaction.user) return interaction.reply(`${RandomPhrase()} o cabo de ${interaction.client.user} antes que você pudesse banir você mesmo!`);
    if (mods[user.id]) return interaction.reply(`Ei, o que você pensa que tá fazendo?`);

    let guild  = client.guilds.cache.first();
    let member = guild?.members.cache.get(user?.id as string);

    let banEmbed = await BuildPunishmentEmbed({
        title: `Você foi banido de ${guild?.name}.`,
        punishedBy: interaction.user,
        thumbnail: Basil.muito_bravo,
        image: RandomGIF(),
        color: 0xef2104,
        reason,
    });

    if (member) await member?.send({ embeds: [ banEmbed ] }).catch(console.log);
    /*
    Imagino que deva causar pânico no código caso o usuário esteja no servidor
    mas tenha bloqueado o bot, então como forma de prevenir esse pânico,
    fiz o tratamento do possível erro usando o catch
    */

    await guild?.members?.ban(user, { reason, deleteMessageSeconds: weekInSeconds })
    .then(() => {
        interaction.reply(`O usuário ${user} (${user?.id}) foi banido de ${guild?.name}.`);
    })
    .catch(e => {
        interaction.reply(`Não foi possível banir o usuário ${user} (${user?.id}).\n${e}.`);
    });
}