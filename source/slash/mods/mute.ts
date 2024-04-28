import { ChatInputCommandInteraction, PermissionFlagsBits, SlashCommandBuilder, User } from "discord.js";
import { BuildPunishmentEmbed } from "../../utils/buildEmbed";
import { RandomPhrase } from "../../utils/randomPhrase";
import { minute, hour, day } from "../../utils/utils";
import { mods } from "../../utils/mods";
import { client } from "../../client";

export const data = new SlashCommandBuilder()
.setName("mute")
.setDescription("Silencia um usuário.")
.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário no qual deseja silenciar.")
    .setRequired(true)
)
.addStringOption(option =>
    option
    .setName("duracao")
    .setDescription("Seleciona a duração do silenciamento.")
    .setChoices(
        { name: "1 minuto",   value: `1 minuto:${minute}`        },
        { name: "10 minutos", value: `10 minutos:${minute * 10}` },
        { name: "30 minutos", value: `30 minutos:${minute * 30}` },
        { name: "1 hora",     value: `1 hora:${hour}`            },
        { name: "6 horas",    value: `6 horas:${hour * 6}`       },
        { name: "12 horas",   value: `12 horas:${hour * 12}`     },
        { name: "1 dia",      value: `1 dia:${day}`              },
        { name: "7 dias",     value: `7 dias:${day * 7}`         }
    )
    .setRequired(true)
)
.addStringOption(option =>
    option
    .setName("motivo")
    .setDescription("Descreva o motivo do silenciamento.")
)

export const requiredPermission = PermissionFlagsBits.MuteMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    let duration = (interaction.options.getString("duracao") as string).split(":");
    let reason   = interaction.options.getString("motivo") || "Não especificado.";
    let user     = interaction.options.getUser("usuario") as User;

    if (user === interaction.user) return interaction.reply(`${RandomPhrase()} o cabo de ${interaction.client.user} antes que você pudesse se autossilenciar!`);
    if (mods[user.id]) return interaction.reply(`Ei, o que você pensa que tá fazendo?`);

    let durationAsNumber = Number(duration[1]);
    let durationAsText   = duration[0];

    let guild  = client.guilds.cache.first();
    let member = guild?.members.cache.get(user?.id as string);

    let muteEmbed = await BuildPunishmentEmbed({
        title: `Você foi silenciado em ${guild?.name}.`,
        punishedBy: interaction.user,
        reason,
    });

    await member?.send({ embeds: [ muteEmbed ] });

    await member?.timeout(durationAsNumber, reason)
    .then(() => {
        interaction.reply(`O membro ${user} (${user?.id}) foi silenciado por ${durationAsText} em ${guild?.name}.`);
    })
    .catch(e => {
        interaction.reply(`Não foi possível silenciar o membro ${user} (${user?.id}).\n${e}.`);
    });
}