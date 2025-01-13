import fetch from 'node-fetch';
import uploadImage from '../lib/uploadImage.js'

let handler = async (m, { conn, usedPrefix, command, text }) => {
conn.tozombie = conn.tozombie ? conn.tozombie : {};
if (m.chat in conn.tozombie) {
return m.reply("_Mohon Tunggu Sebentar, Masih Ada Proses Yang Belum Selesai_");
}
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) throw 'Send Foto Dengan Caption .hdr'
m.reply(wait)
let media = await q.download()
let url = await uploadImage(media)
conn["tozombie"][m.chat] = true;
let anu = await fetch(`https://aemt.me/converter/zombie?url=${url}`)
let hasil = await anu.json()
await conn.sendFile(m.chat, hasil.url, 'anu.jpg', '_Succes To Zombie Style_', m)
delete conn.tozombie[m.chat];
}
handler.command = /^(tozombie|jadizombie)$/i
handler.help = ['tozombie']
handler.tags = ['aiv2']
handler.register = false
handler.limit = true

export default handler
