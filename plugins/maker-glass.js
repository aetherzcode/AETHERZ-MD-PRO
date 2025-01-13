let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Masukan Format Dengan Benar!\n\nContoh\n${usedPrefix + command} Raja Iblis`
  let res = API('https://api.lolhuman.xyz' , '/api/ephoto1/wetglass', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'glass.jpg', 'Ini Dia Kak', m, false)
}
handler.help = ['glass']
handler.tags = ['maker']
handler.command = /^(glass)$/i
handler.limit = true
export default handler