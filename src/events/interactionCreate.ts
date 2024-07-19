import {
    ChatInputCommandInteraction,
    GuildMemberRoleManager,
    Events,
    Guild,
} from "discord.js";

import slashCommands from "../handlers/slash";

export const eventName = Events.InteractionCreate;

interface CustomErrorMessagesInterface
{
    [key: string]: string
}

const customErrorMessages: CustomErrorMessagesInterface = {
    // Caso você tenha clonado este repositório e quiser remover as mensagens de erro personalizadas, basta deletar esse objeto e alterar a linha 38 como quiser
    "punch": "Você precisa de mais 3 anos de treinamento para usar este comando!"
};

const generateCustomErrorMessage = (commandName: string) => {
    return customErrorMessages[commandName] || "Ei, você não tem permissão para usar esse comando!";
}

export const execute = async (interaction: ChatInputCommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const slashCommand = slashCommands.find(command => command.data.name === interaction.commandName);
    
	if (!slashCommand)
    {
        await interaction.reply(`Nenhuma correspondência foi encontrada para o comando ${interaction.commandName}.`).catch(console.error);
        return;
    };
    
    const member = interaction.member;
    
    // Se não for um membro, então nem tchun (ou melhor, se a interação não for feita em um servidor, então retorne)
    if (!member) return;
    
    const roles = member.roles as GuildMemberRoleManager;

    const customErrorMessage = generateCustomErrorMessage(interaction.commandName);

    const guild = interaction.guild as Guild;

    // Verificar se o comando requer algum cargo e, se for o caso, verificar se o membro possui o cargo necessário para executar o comando e se o ID do membro é diferente do ID do dono
    if
    (
        slashCommand.requiredRoles &&
        !roles.cache.some(role => slashCommand.requiredRoles.includes(role.id)) &&
        member.user.id != guild.ownerId
    )
    {
        await interaction.reply(customErrorMessage).catch(e => console.error(`Erro ao gerar mensagem de erro:`, e));
        return;
    };
    
    await slashCommand.execute(interaction).catch(console.error);
}