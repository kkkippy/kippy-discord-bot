import { User } from "discord.js"

export type TicketActions = "create" | "close";

type fields = Array<{ name: string; value: string }>;

export interface EmbedOptions
{
    description?: string;
    thumbnail?:   string;
    fields?:      fields;
    color?:       number;
    image?:       string;
    title?:       string;
}

export interface CloseTicketEmbedOptions extends EmbedOptions
{
    fields:  fields;
    color:   number;
    image:   string;
}

export interface CreateTicketEmbedOptions extends EmbedOptions
{
    guildName:    string;
    fields:       fields;
    image:        string;
    color:        number;
}
export interface PunishmentEmbedOptions extends EmbedOptions
{
    punishedBy:   User;
    reason:       string;
    title:        string;
}