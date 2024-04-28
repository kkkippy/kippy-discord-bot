import { User } from "discord.js"

export type TicketActions = "create" | "close";

export interface TickedEmbedOptions
{
    // Opcional
    description?: string,

    // Obrigatório
    guildName:    string,
    fields:       Array<{ name: string, value: string }>
    image:        string,
    color:        number,
}

export interface PunishmentEmbedOptions
{
    // Opcional
    description?: string,
    thumbnail?:   string,
    fields?:      Array<{ name: string, value: string }>
    color?:       number,
    image?:       string,

    // Obrigatório
    punishedBy:   User
    reason:       string,
    title:        string,
}