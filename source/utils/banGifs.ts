const BanGIFs = [
    "https://media.discordapp.net/attachments/1172662617354010695/1233262190983909498/emoji_ban1.gif?ex=662c746b&is=662b22eb&hm=3de560e31291dab2117014594635a032858533a2cbda507659ac4080c5c21d84&=&width=345&height=172",
    "https://media.discordapp.net/attachments/1172662617354010695/1233261227954933770/thor_ban.gif?ex=662c7385&is=662b2205&hm=53fb99b95c14420616f0ce40af91574b5095ff6c885e3b71618dc40598e8a3b1&=&width=398&height=168"
]

export function RandomGIF ()
{
    return BanGIFs[Math.floor(Math.random() * BanGIFs.length)];
}