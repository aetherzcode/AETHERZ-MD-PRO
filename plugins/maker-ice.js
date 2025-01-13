let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Elaina`
  let res = API('https://api.lolhuman.xyz', '/api/textprome/icecold', { text: text }, 'apikey')
 await conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['ice']
handler.tags = ['maker']
handler.command = /^(ice)$/i
handler.limit = true
export default handler