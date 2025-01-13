let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan Text Nya!\n\nContoh\n${usedPrefix + command} Elaina`
  let res = API('https://api.lolhuman.xyz', '/api/photooxy1/harrypotter', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'error.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['harrypotter']
handler.tags = ['maker']
handler.command = /^(harrypotter)$/i
handler.limit = true
export default handler