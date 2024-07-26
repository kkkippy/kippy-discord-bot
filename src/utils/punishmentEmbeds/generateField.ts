// Caso este sistema não esteja favorável para você, sinta-se à vontade para modifica-lo como quiser

import {
    roles,
    server
} from "../../data/ids.json";

import client from "../../client";

const generateStaffNames = async () => {
    try
    {
        const guild = await client.guilds.fetch(server.id);
        const members = await guild.members.fetch();
        
        const staffs = members
        .filter(member => member.roles.cache.has(roles.supportRole))
        .map(member => `**@${member.user.username}**`);

        const lastStaff = staffs.pop();

        if (!lastStaff)
        {
            const owner = await client.users.fetch(guild.ownerId);

            return `**@${owner.username}**`;
        }

        return `${staffs.join(", ")} ou ${lastStaff}`;
    } catch (e)
    {
        console.error(`Ocorreu um erro ao gerar nomes de membros da staff:`, e);
    }
}

const GenerateApologyField = async () => [
    {
        name: "Acha que isso foi um engano?",
        value: `Se você acha que isso foi um engano, entre em contato com ${await generateStaffNames()} (aceitamos seu pedido de amizade).`
    }
]

export default GenerateApologyField;