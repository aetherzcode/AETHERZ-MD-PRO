import fetch from 'node-fetch'
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text, quoted }) => {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
let [title, desc, atk, def] = text.split("|")
if (!title || !desc || !atk || !def) throw `*reply/send your image with caption* .yugioh Skyline|My Husbu Hhee|999|999`
let startTime = new Date();
conn.sendMessage(m.chat, {
		react: {
			text: '♻️',
			key: m.key,
		}
	})
let media = await q.download()
let url = await uploadImage(media)

let hasil = await (await fetch(`https://api.lolhuman.xyz/api/yugioh?apikey=${global.lol}&img=${url}&title=${title}&desc=${desc}&atk=${atk}&def=${def}`)).buffer()

await conn.sendFile(m.chat, hasil, 'yugioh.jpg',  `*Fetching:* ${(new Date() - startTime) / 1000} seconds`, m)
}
handler.help = ['yugioh']
handler.tags = ['maker']
handler.command = /^(yugioh)$/i
handler.register = true
handler.premium = false
handler.limit = true
export default handler