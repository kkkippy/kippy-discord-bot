import { PermissionResolvable, PermissionsBitField } from "discord.js";

const AllPermissions = [
    PermissionsBitField.Flags.MuteMembers,
    PermissionsBitField.Flags.KickMembers,
    PermissionsBitField.Flags.BanMembers,
]

interface Mods
{
    [userId: string]: PermissionResolvable[]
}

export const mods: Mods = {
    "1100135686948012213": AllPermissions, // Kippy
    "884296522345369622" : AllPermissions, // Ianwu8
    "1203512811540709447": AllPermissions, // Woo
};