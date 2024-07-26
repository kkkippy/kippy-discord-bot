import {
    server,
    roles
} from "../data/ids.json";

import client from "../client"

export const isStaff = async (userId: string) => {
    try
    {
        const guild = await client.guilds.fetch(server.id);

        const members = await guild.members.fetch();

        const isStaff = members.some(member => 
            member.roles.cache.has(roles.support) && member.id === userId
        );

        return isStaff;
    } catch (e)
    {
        console.error("Erro ao verificar se o usuário é staff:", e);
        return false;
    }
}