import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
.setName("userinfo")
.setDescription("...")
.setDMPermission(false)
.addUserOption(option =>
    option
    .setName("usuario")
    .setDescription("Selecione o usuário que deseja obter as informações")
    .setRequired(true)
);

export const execute = async (interaction: ChatInputCommandInteraction) => {
    const user = interaction.options.getUser("usuario");

    const guild = interaction.guild;

    if (!user) return;

    const createdTimestampInSeconds = Math.floor(user.createdTimestamp / 1000);
    
    const userinfoEmbed = new EmbedBuilder()
    .setURL(`https://discord.com/users/${user.id}`)
    .setTitle((guild?.ownerId === user.id ? "👑 " : "👤 ") + user.displayName)
    .setThumbnail(user.avatarURL())
    .setColor(0xcccccc)
    .setFields(
        {
            name: "ID do usuário:",
            value: user.id
        },
        {
            name: "Username do Discord:",
            value: `${user.username}`
        },
        {
            name: "Data de criação da conta:",
            value: `<t:${createdTimestampInSeconds}:F> (<t:${createdTimestampInSeconds}:R>)`
        }
    )
    
    const member = await guild?.members.fetch({ user: user.id }).catch(console.log);
    
    if (member && member.joinedTimestamp)
    {
        const joinedTimestampInSeconds = Math.floor(member.joinedTimestamp / 1000);

        userinfoEmbed.addFields({
            name: "Entrou no servidor em:",
            value: `<t:${joinedTimestampInSeconds}:F> (<t:${joinedTimestampInSeconds}:R>)`
        })
    }

    return await interaction.reply({ content: `Exibindo as informações de **${user.username}** (${user.id}).`, embeds: [ userinfoEmbed ] });
}