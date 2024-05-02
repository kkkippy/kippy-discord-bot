import { Events, GuildMember } from "discord.js";
import { RemoveUser } from "../mongoose";

export const eventName = Events.GuildMemberRemove;

export const execute = async (member: GuildMember) => {
	await RemoveUser(member.user);
}