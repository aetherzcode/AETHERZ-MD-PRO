import axios from 'axios'
let handler = async(m, { conn, text, usedPrefix, command }) => {
    if (!text) return m.reply(`Masukan URL!\n\nContoh:\n${usedPrefix + command} https://sck.io/p/jiv-dwZX`)
    conn.sendReact(m.chat, '🕐', m.key)
    let res = await axios.get(API('lol', '/api/snackvideo', { url: text }, 'apikey'))
    await conn.sendFile(m.chat, res.data.result.url, null, res.data.result.caption ? res.data.result.caption : '', m)
    conn.sendReact(m.chat, '', m.key)
}
handler.help = ['snackvideo'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(snackvid(io|eo)?)$/i
handler.limit = true
export default handler