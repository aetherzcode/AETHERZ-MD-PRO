
import fs from 'fs'
import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text, args }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let pp = await conn.profilePictureUrl(who).catch(_ => hwaifu.getRandom())
let name = await conn.getName(who)
    if (!text) return conn.reply(m.chat, 'Harap Masukan Nama Film Animenya', m)
	 let res = await fetch(`https://api.lolhuman.xyz/api/lk21?apikey=${global.lol}&query=${text}`)
	 let jsons = await res.json()
	 let x = jsons.result
let hasil = `*${htki} ANIME-SEARCH ${htka}*\n
*title:* ${x.title}
*link:* ${x.link}
*thumbnail:* ${x.thumbnail}
*genre:* ${x.genre}
*views:* ${x.views}
*duration:* ${x.duration}
*tahun:* ${x.tahun}
*rating:* ${x.rating}
*desc:* ${x.desc}
*actors:* ${Array.from(x.actors)}
*location:* ${x.location}
*date_release:* ${x.date_release}
*language:* ${x.language}
*link_dl:* ${x.link_dl}`
    await conn.sendFile(m.chat, await(await fetch(x.thumbnail)).buffer(), '', hasil, m)
}
handler.help = ['filmanime'].map(v => v + '<film>')
handler.tags = ['internet', 'anime']
handler.command = /^(filmanime)$/i

export default handler

async function shortUrl(url) {
	let res = await fetch(`https://tinyurl.com/api-create.php?url=${url}`)
	return await res.text()
}