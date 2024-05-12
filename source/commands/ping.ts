import { Message } from "discord.js";

export const name = "ping";

export const execute = async (message: Message) => {
    message.reply("pong!");
}