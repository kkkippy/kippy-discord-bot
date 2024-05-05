import { Events, GuildMember, Message, User } from "discord.js";
import { BuildPunishmentEmbed } from "../utils/buildEmbed";
import { forEachUrl, hasUrl, hour } from "../utils/utils";
import { isBlacklisted } from "../utils/blacklist";
import { SendPunishmentLog } from "../utils/logs";
import { mods } from "../utils/mods";
import { client } from "../client";

export const eventName = Events.MessageCreate;

const blacklistedHosts = [
	"pornhub.com",
	"xvideos.com"
];

const whitelistedInvites = [
	"kippy",
	"rodevs",
	"hd"
];

async function MuteMember (member: GuildMember, reason: string)
{
    if (mods[member.id]) return;
 
	const guild = member.guild;

    const muteEmbed = await BuildPunishmentEmbed({
        title: `Você foi silenciado em ${guild.name}.`,
        punishedBy: client.user as User,
        reason,
    });

    await member.send({ embeds: [ muteEmbed ] }).catch(console.log);
    await member.timeout(hour, reason);

    await SendPunishmentLog(guild, `O usuário ${member} (${member.id}) foi silenciado **automaticamente** por 1 hora pelo motivo: **${reason}**`);
}

function filterCreationsMessage (message: Message)
{
	if (!hasUrl(message.content)) return true;

	const member = message.member;

	if (!member) return true;

	forEachUrl(message.content, async url => {
		const paths = url.pathname.split("/").filter(Boolean)
		.map(path => path.toLowerCase());
		
		for (const host of blacklistedHosts)
		{
			if (host.includes(url.hostname))
			{
				if (message.deletable) message.delete();
				await MuteMember(member, "Envio de links não permitidos.")
			}
		}

		if ((url.hostname === "discord.gg" || `${url.hostname + url.pathname}`.startsWith("discord.com/invite")) && paths.length != 0)
		{
			const inviteName = paths[paths.length - 1];

			if (!whitelistedInvites.includes(inviteName))
			{
				await MuteMember(member, "Envio de convite de servidor não permitido.")
				.then(() => {
					message.reply(`O usuário ${member} (${member.id}) foi silenciado **automaticamente** por **10 minutos** por enviar um convite de servidor não permitido.`)
				});
			}
		}
	});
}

export const execute = async (message: Message) => {
	filterCreationsMessage(message);
}