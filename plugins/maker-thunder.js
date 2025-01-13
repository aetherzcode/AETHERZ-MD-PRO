let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Elaina`
  let res = API('https://api.lolhuman.xyz', '/api/textprome/thunder', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['thunder']
handler.tags = ['maker']
handler.command = /^(thunder)$/i
handler.limit = true
export default handler