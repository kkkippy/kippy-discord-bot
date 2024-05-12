import { ActionRowBuilder, ButtonBuilder, ButtonStyle, CategoryChannel, ChannelType, ChatInputCommandInteraction, EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder, TextChannel } from "discord.js";
import { BuildCreateSupportTicketEmbed, BuildCreateSuggestionTicketEmbed } from "../../utils/buildEmbed";

async function getCorrespondingEmbed (interaction: ChatInputCommandInteraction, channel: TextChannel)
{
    if (channel.name === "sugestões") return await BuildCreateSuggestionTicketEmbed(interaction);
    if (channel.name === "suporte") return await BuildCreateSupportTicketEmbed(interaction);

    return new EmbedBuilder()
    .setTitle("Algo deu errado...");
}

export const data = new SlashCommandBuilder()
.setName("create-tickets")
.setDescription("...")
.setDMPermission(false);

export const requiredPermission = PermissionFlagsBits.MuteMembers;

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const createButton = new ButtonBuilder()
    .setLabel("Criar ticket")
    .setCustomId("ticket:create")
    .setStyle(ButtonStyle.Success)

    const row = new ActionRowBuilder<ButtonBuilder>()
    .setComponents(createButton);

    const ticketCategory = interaction.guild?.channels.cache.get("1166871569541373952") as CategoryChannel;

    ticketCategory.children.cache.forEach(async channel => {
        if (channel.type === ChannelType.GuildText)
        {
            const correspondingChannelEmbed = await getCorrespondingEmbed(interaction, channel);

            channel.send({ embeds: [ correspondingChannelEmbed ], components: [ row ] });
        }
    });

    return await interaction.reply({ content: `Mensagens setadas na categoria de tickets.`, ephemeral: true });
}