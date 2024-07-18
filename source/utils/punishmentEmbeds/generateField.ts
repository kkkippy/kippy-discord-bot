// Caso este sistema não esteja favorável para você, sinta-se à vontade para modifica-lo como quiser

import {
    supportRole,
    serverId
} from "../../data/generalConfig.json";

import { client } from "../../client";

const generateStaffNames = async () => {
    try
    {
        const guild = await client.guilds.fetch(serverId);
        const members = await guild.members.fetch();
        
        const staffs = members
        .filter(member => member.roles.cache.has(supportRole)) // Filtrará apenas os membros que possuem cargo de suporte
        .map(member => `**@${member.user.username}**`); // E depois organizará os dados para que possam ser inseridos dentro dos embeds de punições

        const lastStaff = staffs.pop(); // Removerá o último staff da lista

        if (!lastStaff)
        {
            // Caso não exista staffs, então o bot utilizará o username do dono do servidor
            const owner = await client.users.fetch(guild.ownerId);

            return `**@${owner.username}**`;
        }

        return `${staffs.join(", ")} ou ${lastStaff}`;
    } catch (e)
    {
        console.error(`Ocorreu um erro ao gerar nomes de membros da staff:`, e);
    }
}

export const GenerateApologyField = async () => [
    {
        name: "Acha que isso foi um engano?",
        value: `Se você acha que isso foi um engano, entre em contato com ${await generateStaffNames()} (aceitamos seu pedido de amizade).`
    }
]