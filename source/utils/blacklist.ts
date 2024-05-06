import { GuildMember, Message, User } from "discord.js";
import { BuildPunishmentEmbed } from "./buildEmbed";
import { getUrls, hasUrl, minute } from "./utils";
import { SendPunishmentLog } from "./logs";
import { client } from "../client";
import { mods } from "./mods";

const blacklistedHosts = [
	"pornhub.com",
	"xvideos.com",
    "rule34.xxx"
];

const whitelistedInvites = [
	"kippy",
	"rodevs",
	"hd"
];

async function MuteMember (member: GuildMember, reason: string, message?: Message)
{
	if (mods[member.id]) return;

	const guild = member.guild;

	const muteEmbed = await BuildPunishmentEmbed({
		title: `Você foi silenciado em ${guild.name}.`,
		punishedBy: client.user as User,
		reason,
	});

	await member.timeout(minute * 10, reason)
	.then(() => {
		if (message) message.channel.send(`O usuário ${member} (${member.id}) foi silenciado **automaticamente** por **10 minutos** por enviar uma mensagem blacklisted.`);
		
		member.send({ embeds: [ muteEmbed ] }).catch(console.log);
		
		SendPunishmentLog(guild, `O usuário ${member} (${member.id}) foi silenciado **automaticamente** por **10 minutos** pelo motivo: **${reason}**`);
	})
	.catch(console.log);
}

const isWhitelistedInvite = (inviteName: string) => whitelistedInvites.includes(inviteName);

const isDiscordInvite = (url: URL, paths: string[]) => (url.hostname === "discord.gg" || `${url.hostname + url.pathname}`.startsWith("discord.com/invite")) && paths.length != 0;

function isBlacklistedHost (hostname: string)
{
	for (const blacklistedHost of blacklistedHosts)
	{
		if (blacklistedHost.startsWith(hostname)) return true;
	}
}

export function isBlacklisted (message: Message)
{
	if (!hasUrl(message.content)) return false;

	const urls = getUrls(message.content);

	for (const url of urls)
	{
		const paths = url.pathname.split("/").filter(Boolean).map(path => path.toLocaleLowerCase());
		const invite = paths[paths.length - 1];

		if (isBlacklistedHost(url.hostname)) return true;
		if (isDiscordInvite(url, paths) && !isWhitelistedInvite(invite)) return true;
	}
}

export async function moderateMessage (message: Message, reason: string)
{
	const member = message.member;

	if (!member || mods[member.id]) return;

	if (message.deletable) message.delete();

	await MuteMember(member, reason, message);
}
