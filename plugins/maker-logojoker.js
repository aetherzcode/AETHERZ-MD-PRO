let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return m.reply(`Masukan Format Dengan Benar!\n\nExample\n${usedPrefix + command} Joker`)
  let res = API('https://api.lolhuman.xyz', '/api/textprome/jokerlogo', { text: text }, 'apikey')
  conn.sendFile(m.chat, res, 'joker.jpg', 'Sudah Jadi', m, false)
}
handler.help = ['logojoker'].map(v => v + ' <text>')
handler.tags = ['nulis']
handler.command = /^(logojoker)$/i

handler.limit = true

export default handler
