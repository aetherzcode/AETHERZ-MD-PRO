import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) throw 'Masukan Query'
m.reply(wait)
let sange = await fetch (`https://api.betabotz.eu.org/api/search/bing-img?text=${text}&apikey=${global.lann}`)
let anu = await sange.json()
conn.sendFile(m.chat, anu.result, 'sange.jpg', '_Nih Kak Hasilnya_', m)
}
handler.command = /^(bingimg)$/i
handler.help = ['bingimg']
handler.tags = ['aiv2']
handler.register = false
handler.limit = 15;

export default handler